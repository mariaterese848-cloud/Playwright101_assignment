import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.on('console', msg => console.log('Console Log:', msg.text()));
});

test('Test scenario 1- Simple Form Demo', async ({ page }) => {
  // 1. Open TestMu AI’s Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');

  // 2. Click “Simple Form Demo”
  await page.click('text=Simple Form Demo');

  // 3. Validate that the URL contains “simple-form-demo”
  await expect(page).toHaveURL(/.*simple-form-demo/);

  // 4. Create a variable for a string value
  const message = "Welcome to TestMu AI";

  // 5. Enter the message in the text box
  const inputField = page.getByPlaceholder("Please enter your Message");
   await inputField.pressSequentially("123", { delay: 200 });
   await inputField.clear();
  await inputField.pressSequentially(message, { delay: 200 });
  await expect(inputField).toHaveValue(message);
 

  // 6. Click “Get Checked Value” without waiting for navigation
   await page.getByRole('button', { name: 'Get Checked Value' }).click();
  
  // 7. Validate the output message
  const output = page.locator('#message');
  console.log(await output.textContent());
  await expect(output).toHaveText(message);
});

test('Test Scenario 2 - Drag & Drop Slider', async ({ page }) => {
   // 1. Open TestMu AI’s Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');

  //2. click “Drag & Drop Sliders”
  await page.getByRole('link', {name : 'Drag & Drop Sliders'}).click();

  //3.Select the slider “Default value 15”
  const slider = page.locator('input[value="15"]');
  const rangeValue = page.locator('#rangeSuccess');
  await slider.click();


  // 4. Drag the slider to 95
  const targetValue = '95';
  let currentValue = await rangeValue.innerText();
  while (currentValue !== targetValue) {
    await slider.press('ArrowRight');
    currentValue = await rangeValue.innerText();
  }

  // 5. Validate that the range value shows 95
   
  await expect(rangeValue).toHaveText(targetValue);
});



test('Test Scenario 3: Input Form Submit validation', async ({ page }) => {
    // 1. Open the URL and click “Input Form Submit”
    await page.goto(' https://www.testmuai.com/selenium-playground/');
     await page.click('text=Input Form Submit');


    // 2. Click “Submit” without filling in any information
    const submitButton =  page.getByRole('button', { name: 'Submit' })
    await submitButton.click();
    await page.waitForTimeout(1000);
  
    // 3. Assert “Please fill in the fields” error message
   
    const nameInput = page.locator("#name");
    const validationMessage = await nameInput.evaluate((node: HTMLInputElement) => 
    node.validationMessage);
   
    expect(validationMessage).not.toBe('');
    expect(validationMessage).toContain('Please fill out this field.');
    
    // 4. Fill in Name, Email, and other fields
    await nameInput.fill('test user');
    await page.getByPlaceholder('Email').fill('testuser@test.com');
    await page.locator('#inputPassword4').fill('Password123!');
    await page.locator('input[name = "company"]').fill('Test corp');
    await page.locator("#websitename").fill('https://example.com');
  

    // 5. From the Country drop-down, select “United States” using the text property and fill in address details
    await page.selectOption('select[name="country"]', { label: 'United States' });
    await page.fill('input[name="city"]', 'New York');    
    await page.getByPlaceholder('Address 1').fill('123 Main St');
    await page.locator("#inputAddress2").fill('Apt 4B');
    await page.locator("#inputState").fill('NY');
    await page.fill('input[name="zip"]', '10001');
    
    // 6. Click “Submit”
    await submitButton.click();


    // 7. Validate the success message
    const successMessage = page.locator('p.success-msg');
    await successMessage.scrollIntoViewIfNeeded();
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Thanks for contacting us, we will get back to you shortly.');
});

