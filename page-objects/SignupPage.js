const BasePage = require('./BasePage');

/**
 * SignupPage - Page Object for the Sign Up screen
 * Selectors verified via live exploratory session on Samsung Galaxy S23
 * App package: com.yash.bankingapp
 *
 * Verified selectors (signup screen):
 *   bs-logo-signup              → LinearLayout resource-id
 *   "Create Account"            → TextView text (screen title)
 *   fullname-input              → EditText resource-id
 *   email-input                 → EditText resource-id
 *   password-input              → EditText resource-id
 *   confirm-password-input      → EditText resource-id
 *   toggle-confirm-password-visibility → Button resource-id
 *   signup-btn                  → Button resource-id / content-desc "Create your account"
 *
 * Verified selectors (login screen):
 *   goto-signup                 → View resource-id / content-desc "Go to sign up"
 */
class SignupPage extends BasePage {
  // ─── Login screen ─────────────────────────────────────────────────────────

  get signUpLink() {
    return $('android=new UiSelector().resourceId("goto-signup")');
  }

  // ─── Signup screen ────────────────────────────────────────────────────────

  get screenTitle() {
    return $('android=new UiSelector().text("Create Account")');
  }

  get fullNameInput() {
    return $('android=new UiSelector().resourceId("name-input")');
  }

  get emailInput() {
    return $('android=new UiSelector().resourceId("email-input")');
  }

  get passwordInput() {
    return $('android=new UiSelector().resourceId("password-input")');
  }

  get confirmPasswordInput() {
    return $('android=new UiSelector().resourceId("confirm-password-input")');
  }

  get createAccountButton() {
    return $('android=new UiSelector().resourceId("signup-submit-btn")');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async tapSignUpLink() {
    await this.tap('android=new UiSelector().resourceId("goto-signup")');
  }

  async enterFullName(name) {
    await this.typeText('android=new UiSelector().resourceId("fullname-input")', name);
  }

  async enterEmail(email) {
    await this.typeText('android=new UiSelector().resourceId("email-input")', email);
  }

  async enterPassword(password) {
    await this.typeText('android=new UiSelector().resourceId("password-input")', password);
  }

  async enterConfirmPassword(password) {
    await this.typeText('android=new UiSelector().resourceId("confirm-password-input")', password);
  }

  async tapCreateAccountButton() {
    await this.hideKeyboard();
    await this.tap('android=new UiSelector().resourceId("signup-submit-btn")');
  }

  async isSignupScreenDisplayed() {
    return this.isDisplayed('android=new UiSelector().text("Create Account")');
  }

  async isCreateAccountButtonDisplayed() {
    return this.isDisplayed('android=new UiSelector().resourceId("signup-submit-btn")');
  }
}

module.exports = new SignupPage();
