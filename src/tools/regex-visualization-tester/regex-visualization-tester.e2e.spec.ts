import { test, expect } from '@playwright/test';

test.describe('Tool - Regex visualization tester', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('regex-visualization-tester');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Regex visualization tester - IT Tools');
  });

  test('Test text matched conversion', async ({ page }) => {
    await page.getByTestId('test-text-input').fill('13900139000');
    const matchText = await page.getByTestId('match-result').textContent();
    expect(matchText).toContain('true');
  });

  test('Test text unmatched conversion', async ({ page }) => {
    await page.getByTestId('test-text-input').fill('abcdefg');
    const matchText = await page.getByTestId('match-result').textContent();
    expect(matchText).toContain('false');
  });
});
