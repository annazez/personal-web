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

    // Patch TextEncoder.prototype.encode to return empty bytes for string inputs,
    // forcing bodySize to 0 so that calculateCarbonValue returns null.
    // Combined with the empty navigation/resource entries above, totalSize becomes 0
    // and the error path ('Carbon footprint unavailable') is triggered.
    const origEncode = TextEncoder.prototype.encode;
    TextEncoder.prototype.encode = function (input?: string) {
      if (typeof input === 'string') {
        return new Uint8Array(0);
      }
      return origEncode.call(this, input);
    };
  });

  await page.goto('/en/');

  // The carbon footprint parent is a <p> tag with data-carbon-footprint.
  const parentContainer = page.locator('p[data-carbon-footprint]');

  // Assert the element is present in the DOM before checking visibility,
  // so the test doesn't silently pass if the element is missing for unrelated reasons.
  await expect(parentContainer).toHaveCount(1);

  // Wait for the container to become hidden due to the error.
  // The error is thrown after a 500ms calculation delay.
  await expect(parentContainer).toBeHidden({ timeout: 2000 });
});
