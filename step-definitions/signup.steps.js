const { When, Then } = require('@wdio/cucumber-framework');
const signupPage = require('../page-objects/SignupPage');

/**
 * Signup Step Definitions
 * Covers the registration flow: login screen → Sign Up link → signup form
 * App package: com.yash.bankingapp
 */

Then('I should see the full name input field', async () => {
  await driver.waitUntil(
    async () => signupPage.isDisplayed('android=new UiSelector().resourceId("name-input")'),
    { timeout: 10000, timeoutMsg: 'Full name input field was not visible on the signup screen' }
  );
  const isDisplayed = await signupPage.isDisplayed('android=new UiSelector().resourceId("name-input")');
  expect(isDisplayed).toBe(true);
});

Then('the full name field should contain {string}', async (expectedText) => {
  const el = await $('android=new UiSelector().resourceId("name-input")');
  await el.waitForDisplayed({ timeout: 10000 });
  const actualText = await el.getText();
  expect(actualText).toBe(expectedText);
});

When('I tap the Sign Up link', async () => {
  await signupPage.tapSignUpLink();
  await driver.waitUntil(
    async () => signupPage.isSignupScreenDisplayed(),
    { timeout: 10000, timeoutMsg: 'Signup screen did not appear after tapping Sign Up link' }
  );
});

When('I enter full name {string}', async (name) => {
  await signupPage.enterFullName(name);
});

When('I enter signup email {string}', async (email) => {
  await signupPage.enterEmail(email);
});

When('I enter signup password {string}', async (password) => {
  await signupPage.enterPassword(password);
});

When('I confirm signup password {string}', async (password) => {
  await signupPage.enterConfirmPassword(password);
});

When('I tap the Create Account button', async () => {
  await signupPage.tapCreateAccountButton();
});

Then('I should see the account creation confirmation', async () => {
  await driver.waitUntil(
    async () => {
      const src = await driver.getPageSource();
      return src.includes('Account Created') || src.includes('Welcome') || src.includes('Total Balance');
    },
    { timeout: 15000, timeoutMsg: 'Account creation confirmation did not appear' }
  );
});
