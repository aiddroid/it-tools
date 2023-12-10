import { test, expect } from '@playwright/test';

test.describe('Tool - Text to HEX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('text-to-hex');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Text to HEX - IT Tools');
  });

  test('Text to HEX conversion', async ({ page }) => {
    await page.getByTestId('text-to-hex-input').fill('你a好');
    const hex = await page.getByTestId('text-to-hex-output').inputValue();
    expect(hex).toBe('E4BDA061E5A5BD');
  });

  test('HEX to text conversion', async ({ page }) => {
    await page.getByTestId('hex-to-text-input').fill('E4BDA061E5A5BD');
    const text = await page.getByTestId('hex-to-text-output').inputValue();
    expect(text).toBe('你a好');
  });
});
