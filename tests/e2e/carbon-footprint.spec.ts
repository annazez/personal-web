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

    // We no longer need to mock TextEncoder as calculateCarbonValue has been
    // refactored to use Performance API exclusively.
  });

  await page.goto('/en/');

  // The carbon footprint parent is a <p> tag with data-carbon-footprint.
  const parentContainer = page.locator('p[data-carbon-footprint]');

  // Wait for the container to become hidden due to the error.
  // The error is thrown after a 500ms calculation delay.
  // We use a generous timeout to account for slower CI environments.
  await expect(parentContainer).toBeHidden({ timeout: 10000 });
});
