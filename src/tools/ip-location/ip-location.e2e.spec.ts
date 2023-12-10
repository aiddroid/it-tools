import { test, expect } from '@playwright/test';

test.describe('Tool - Ip location', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('ip-location');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('IP location - IT Tools');
  });

  test('IP location query conversion', async ({ page }) => {
    const status = await page.getByTestId('status').inputValue();
    expect(status).toBe('success');
  });
});
