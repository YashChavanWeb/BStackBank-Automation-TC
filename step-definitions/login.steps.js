const { Given, When, Then } = require('@wdio/cucumber-framework');
const loginPage = require('../page-objects/LoginPage');
const homePage = require('../page-objects/HomePage');
const {
  acceptNotificationPermission,
  handleBiometricDialog,
  acceptLocationPermission,
} = require('./hooks');

/**
 * Login Step Definitions
 * Verified flow on Samsung Galaxy S23 (com.yash.bankingapp):
 *   1. App launch → accept notification permission
 *   2. Login screen → enter credentials → tap Sign In
 *   3. Biometric dialog → tap PASS
 *   4. Location permission → accept "While using the app"
 *   5. Home dashboard with "Total Balance" visible
 */

Given('the BStackBank app is launched', async () => {
  // Accept notification permission if it appears on launch
  await acceptNotificationPermission();
  // Wait for login screen
  await driver.waitUntil(
    async () => loginPage.isLoginScreenDisplayed(),
    { timeout: 15000, timeoutMsg: 'Login screen did not appear within 15 seconds' }
  );
});

Given('I am logged in as {string} with password {string}', async (username, password) => {
  await acceptNotificationPermission();
  await loginPage.login(username, password);
  await handleBiometricDialog();
  await acceptLocationPermission();
  await homePage.waitForDashboard();
});

When('I enter username {string}', async (username) => {
  await loginPage.enterUsername(username);
});

When('I enter password {string}', async (password) => {
  await loginPage.enterPassword(password);
});

When('I tap the login button', async () => {
  await loginPage.tapLoginButton();
});

When('I tap the autofill regular user button', async () => {
  await loginPage.tap('android=new UiSelector().resourceId("autofill-regular")');
});

Then('I should see the home dashboard', async () => {
  // After login: handle biometric then location permission
  await handleBiometricDialog();
  await acceptLocationPermission();
  await driver.waitUntil(
    async () => homePage.isDashboardDisplayed(),
    { timeout: 15000, timeoutMsg: 'Home dashboard did not appear after login' }
  );
  const isDisplayed = await homePage.isDashboardDisplayed();
  expect(isDisplayed).toBe(true);
});

Then('I should see an error message', async () => {
  await driver.waitUntil(
    async () => loginPage.isErrorDisplayed(),
    { timeout: 10000, timeoutMsg: 'Error message did not appear after invalid login' }
  );
  const isDisplayed = await loginPage.isErrorDisplayed();
  expect(isDisplayed).toBe(true);
});

Then('I should see a validation error', async () => {
  await driver.waitUntil(
    async () => loginPage.isValidationErrorDisplayed(),
    { timeout: 10000, timeoutMsg: 'Validation error did not appear' }
  );
  const isDisplayed = await loginPage.isValidationErrorDisplayed();
  expect(isDisplayed).toBe(true);
});
