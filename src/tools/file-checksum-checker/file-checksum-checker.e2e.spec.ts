import { test, expect } from '@playwright/test';

test.describe('Tool - File checksum checker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/file-checksum-checker');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('File checksum checker - IT Tools');
  });

  test('', async ({ page }) => {

  });
});