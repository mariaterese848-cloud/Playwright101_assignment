## README: Playwright 101 Automation Suite
This repository contains an automated test suite developed with Playwright and TypeScript for the TestMu AI Selenium Playground. The suite covers core UI interactions including form handling, slider manipulation, and form validation logic.
------------------------------
## 📂 File Structure

* File Name: playwright101-automation.spec.ts
* Framework: Playwright Test
* Language: TypeScript

------------------------------
## 🧪 Test Scenarios## 1. Simple Form Demo
Validates basic input and output functionality.

* Key Logic: Uses pressSequentially with a delay to ensure text stability and prevent the "disappearing text" issue common in dynamic JS forms.
* Assertion: Verifies that the text entered into the "Enter Message" box is accurately reflected in the "Your Message" display panel.

## 2. Drag & Drop Slider
Tests interaction with HTML5 range sliders.

* Key Logic: Targets the slider with default value 15. It uses a while loop combined with ArrowRight keyboard presses to incrementally move the slider until the UI value reaches exactly 95.
* Assertion: Confirms the range output text matches the target value of 95.

## 3. Input Form Submit Validation
A comprehensive end-to-end test for a multi-field contact form.

* Validation Check: Triggers and validates HTML5 native "Please fill out this field" validation messages.
* Data Entry: Populates Name, Email, Password, Company, Website, and Address details.
* Dropdown Selection: Selects "United States" from the country dropdown using the label property.
* Success Criteria: Validates the visibility and content of the success message after a valid submission.

------------------------------
## 🚀 How to Run

   1. Install Dependencies:
   
   npm install
   
   2. Run All Tests:
   
   npx playwright test playwright101-automation.spec.ts
   
   3. Run in Headed Mode (See the browser):
   
   npx playwright test playwright101-automation.spec.ts --headed
   
   4. View Report:
   
   npx playwright show-report
   
   
------------------------------
## 🛠 Technical Implementation Details

* Console Logging: A beforeEach hook is implemented to pipe all browser console logs to the terminal for easier debugging.
* Stability: Includes waitForTimeout and scrollIntoViewIfNeeded to handle asynchronous UI updates and elements hidden below the fold.
* Locators: Utilizes a mix of getByRole, getByPlaceholder, and CSS selectors for robust element targeting.
