import { expect, test } from '@playwright/test';

test.describe('Command Palette', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/lab/');
    // Wait for all critical scripts to initialize
    await page.waitForFunction(() => {
      const w = window as unknown as Record<string, boolean>;
      return (
        w['__bindOnce_command_palette'] === true &&
        w['__bindOnce_global_hotkeys'] === true &&
        w['__bindOnce_system_modes_manager'] === true
      );
    });
    // Click the body to ensure the page has focus
    await page.locator('body').click();
  });

  test('opens with ? key, enables Architecture X-Ray with A, closes with Esc', async ({ page }) => {
    const dialog = page.locator('#command-palette');

    // Palette should be closed initially
    await expect(dialog).not.toHaveAttribute('open');

    // Press ? to open
    await page.keyboard.press('?');
    await expect(dialog).toHaveAttribute('open', '');

    // Press A to enable Architecture X-Ray
    await page.keyboard.press('a');
    await expect(page.locator('html')).toHaveAttribute('data-lab-mode-arch', 'true');

    // Dialog should close after selecting a mode
    await expect(dialog).not.toHaveAttribute('open');

    // Open palette again
    await page.keyboard.press('?');
    await expect(dialog).toHaveAttribute('open', '');

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(dialog).not.toHaveAttribute('open');
  });

  test('enables Accessibility Audit with U key', async ({ page }) => {
    await page.keyboard.press('?');
    const dialog = page.locator('#command-palette');
    await expect(dialog).toHaveAttribute('open', '');

    await page.keyboard.press('u');
    await expect(page.locator('html')).toHaveAttribute('data-lab-mode-audit', 'true');
    await expect(dialog).not.toHaveAttribute('open');
  });

  test('enables Exploded Layers with L key', async ({ page }) => {
    await page.keyboard.press('?');
    const dialog = page.locator('#command-palette');
    await expect(dialog).toHaveAttribute('open', '');

    await page.keyboard.press('l');
    await expect(page.locator('html')).toHaveAttribute('data-lab-mode-layers', 'true');
    await expect(dialog).not.toHaveAttribute('open');
  });

  test('clears active lab modes with H key', async ({ page }) => {
    await page.goto('/en/lab/');
    await page.waitForFunction(() => {
      const w = window as unknown as Record<string, boolean>;
      return (
        w['__bindOnce_command_palette'] === true &&
        w['__bindOnce_global_hotkeys'] === true &&
        w['__bindOnce_system_modes_manager'] === true
      );
    });
    await page.locator('body').click();

    await page.keyboard.press('?');
    let dialog = page.locator('#command-palette');
    await expect(dialog).toHaveAttribute('open', '');

    await page.keyboard.press('a');
    await expect(page.locator('html')).toHaveAttribute('data-lab-mode-arch', 'true');

    await page.keyboard.press('?');
    dialog = page.locator('#command-palette');
    await expect(dialog).toHaveAttribute('open', '');

    await page.keyboard.press('h');
    await expect(dialog).not.toHaveAttribute('open');
    await expect(page.locator('html')).not.toHaveAttribute('data-lab-mode-arch', 'true');
  });

  test('does not open when typing in an input field', async ({ page }) => {
    // Inject a temporary input into the page
    await page.evaluate(() => {
      const input = document.createElement('input');
      input.id = 'test-input';
      input.type = 'text';
      document.body.appendChild(input);
    });

    await page.locator('#test-input').focus();
    await page.keyboard.press('?');

    const dialog = page.locator('#command-palette');
    await expect(dialog).not.toHaveAttribute('open');
  });
});
