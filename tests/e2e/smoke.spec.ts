import { expect, test } from '@playwright/test';

test('renders English homepage', async ({ page }) => {
  await page.goto('/en/');
  await expect(page).toHaveTitle(/Anna Zezulka/i);
  await expect(page.getByRole('heading', { level: 1, name: 'Anna Zezulka' })).toBeVisible();
});

test('can switch language from EN to CS', async ({ page }) => {
  await page.goto('/en/');

  // Wait for scripts to initialize
  await page.waitForFunction(() => {
    const w = window as unknown as Record<string, boolean>;
    return (
      w['__bindOnce_command_palette'] === true &&
      w['__bindOnce_global_hotkeys'] === true &&
      w['__bindOnce_system_modes_manager'] === true
    );
  });

  // Open the language picker by clicking its summary.
  await page.locator('[data-language-picker] summary').click();

  // Now click the 'CS' link.
  await page.locator('[data-language-picker] a').filter({ hasText: 'CS' }).click();

  await expect(page).toHaveURL(/\/cs\/$/);
  await expect(page.getByText(/vývojářka/i).first()).toBeVisible();
});

test('404 page has recovery links', async ({ page }) => {
  await page.goto('/missing-page');
  await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'EN', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Domu|Domů|Home/i }).first()).toBeVisible();
});
