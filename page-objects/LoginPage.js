const BasePage = require('./BasePage');

/**
 * LoginPage - Page Object for the Login screen
 * Selectors verified via live exploratory session on Samsung Galaxy S23
 * App package: com.yash.bankingapp
 *
 * Verified selectors:
 *   email-input       → EditText (resource-id)
 *   password-input    → EditText (resource-id, password=true)
 *   login-btn         → Button content-desc="Sign in to your account" (resource-id)
 *   toggle-password-visibility → Button content-desc="Show password" (resource-id)
 *   goto-signup       → View content-desc="Go to sign up" (resource-id)
 *   autofill-regular  → ViewGroup content-desc="Regular User" (resource-id)
 *   autofill-incorrect → ViewGroup content-desc="Wrong Login" (resource-id)
 */
class LoginPage extends BasePage {
  // ─── Selectors ────────────────────────────────────────────────────────────

  get usernameField() {
    return $('android=new UiSelector().resourceId("email-input")');
  }

  get passwordField() {
    return $('android=new UiSelector().resourceId("password-input")');
  }

  get loginButton() {
    return $('android=new UiSelector().resourceId("login-btn")');
  }

  get showPasswordButton() {
    return $('android=new UiSelector().resourceId("toggle-password-visibility")');
  }

  get signUpLink() {
    return $('android=new UiSelector().resourceId("goto-signup")');
  }

  get autofillRegularUser() {
    return $('android=new UiSelector().resourceId("autofill-regular")');
  }

  get autofillWrongLogin() {
    return $('android=new UiSelector().resourceId("autofill-incorrect")');
  }

  get welcomeBackText() {
    return $('android=new UiSelector().text("Welcome Back")');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async enterUsername(username) {
    await this.typeText('android=new UiSelector().resourceId("email-input")', username);
  }

  async enterPassword(password) {
    await this.typeText('android=new UiSelector().resourceId("password-input")', password);
  }

  async tapLoginButton() {
    await this.hideKeyboard();
    await this.tap('android=new UiSelector().resourceId("login-btn")');
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.tapLoginButton();
  }

  async loginWithAutofill() {
    await this.tap('android=new UiSelector().resourceId("autofill-regular")');
    await this.tapLoginButton();
  }

  async isLoginScreenDisplayed() {
    // Check login-btn — always visible on login screen regardless of scroll position
    return this.isDisplayed('android=new UiSelector().resourceId("login-btn")');
  }

  async isErrorDisplayed() {
    return this.isDisplayed('android=new UiSelector().textContains("Invalid")');
  }

  async isValidationErrorDisplayed() {
    return this.isDisplayed('android=new UiSelector().textContains("required")');
  }
}

module.exports = new LoginPage();
