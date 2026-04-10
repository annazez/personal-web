import { expect, test } from '@playwright/test';

test('carbon footprint hides when unavailable', async ({ page }) => {
  // Mock performance API to trigger the 'Carbon footprint unavailable' error.
  await page.addInitScript(() => {
    // Override performance.getEntriesByType to return an empty array for both navigation and resource
    const originalGetEntriesByType = performance.getEntriesByType.bind(performance);
    performance.getEntriesByType = (type: string) => {
      if (type === 'navigation' || type === 'resource') {
        return [];
      }
      return originalGetEntriesByType(type);
    };

    // Override document.body?.innerHTML to have 0 length when TextEncoder reads it,
    // though empty navigation and resource entries should be enough to yield size 0.
    // The calculateCarbonValue relies on:
    // navigationSize (0) + bodySize + resourcesSize (0)
    // If bodySize > 0, it might calculate a small footprint.
    // Let's redefine TextEncoder to always return 0 length.
    const OriginalTextEncoder = globalThis.TextEncoder;
    globalThis.TextEncoder = class TextEncoderMock extends OriginalTextEncoder {
      encode(_input?: string) {
        return new Uint8Array(0);
      }
    };
  });

  await page.goto('/en/');

  // The carbon footprint parent is a <p> tag with data-carbon-footprint.
  const parentContainer = page.locator('p[data-carbon-footprint]');

  // Wait for the container to become hidden due to the error.
  // The error is thrown after a 500ms calculation delay.
  await expect(parentContainer).toBeHidden({ timeout: 2000 });
});
