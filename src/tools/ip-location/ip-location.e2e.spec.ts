import { test, expect } from '@playwright/test';

test.describe('Tool - Ip location', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ip-location');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Ip location - IT Tools');
  });

  test('', async ({ page }) => {

  });
});