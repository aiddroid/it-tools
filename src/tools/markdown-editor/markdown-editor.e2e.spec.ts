import { test, expect } from '@playwright/test';

test.describe('Tool - Markdown editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/markdown-editor');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Markdown editor - IT Tools');
  });

  test('', async ({ page }) => {

  });
});