import { test, expect } from '@playwright/test';

test.describe('Tool - JSON Validator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('json-validator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('JSON Validator - IT Tools');
  });

  test('Validate fail conversion', async ({ page }) => {
    const alertText = await page.getByTestId('json-error-message').innerText();
    expect(alertText).toContain('Parse error on line 1');
  });

  // test('Validate success conversion', async ({ page }) => {
  //   await page.getByTestId('raw-json-input').fill('{"foo":"bar"}');
  //   const alertText = await page.getByTestId('json-error-message').innerText();
  //   expect(alertText).toBe('');
  // });
});
