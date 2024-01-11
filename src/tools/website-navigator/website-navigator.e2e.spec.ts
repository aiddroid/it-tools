import { test, expect } from '@playwright/test';

test.describe('Tool - Website navigator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/website-navigator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Website navigator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});