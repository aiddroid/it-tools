import { test, expect } from '@playwright/test';

test.describe('Tool - Photo exif reader', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/photo-exif-reader');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Photo exif reader - IT Tools');
  });

  test('', async ({ page }) => {

  });
});