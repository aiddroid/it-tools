import { test, expect } from '@playwright/test';

test.describe('Tool - Text to hex', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/text-to-hex');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Text to hex - IT Tools');
  });

  test('', async ({ page }) => {

  });
});