import { test, expect } from '@playwright/test';

test('TestMu AI Selenium Playground - Simple Form Demo', async ({ page }) => {
  // 1. Open TestMu AI’s Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');

  // 2. Click “Simple Form Demo”
  await page.click('text=Simple Form Demo');

  // 3. Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/.*simple-form-demo/);

  // 4. Create a variable for a string value
  const message: string = "Welcome to TestMu AI";

  // 5. Enter the message in the text box
  await page.locator("input#user-message").fill(message);

  // 6. Click “Get Checked Value” without waiting for navigation
  await page.locator('button:has-text("Get Checked Value")').click({ noWaitAfter: true });

  // 7. Validate the output message
  const output = page.locator('#message');
  await expect(output).toHaveText(message);
});

test.only('Scenario 2 - Drag & Drop Slider', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.click('text=Drag & Drop Sliders');

  const slider = page.locator('input[type="range"][value="15"]');

  // 4. Drag the slider to 95
  // Playwright doesn’t have a direct “drag to value” API for sliders,
  // so we simulate by setting the value via evaluate.
  await slider.evaluate((el: HTMLInputElement) => {
    el.value = "95";
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // 5. Validate that the range value shows 95
  const rangeValue = page.locator('#rangeSuccess'); // id for the slider output
  await expect(rangeValue).toHaveText("95");
});
