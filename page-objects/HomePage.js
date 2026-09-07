const BasePage = require('./BasePage');

/**
 * HomePage - Page Object for the Home/Dashboard screen
 * Selectors verified via live exploratory session on Samsung Galaxy S23
 * App package: com.yash.bankingapp
 *
 * Verified selectors:
 *   "Good morning,"       → TextView (text)
 *   "Total Balance"       → TextView (text)
 *   balance-eye-btn       → Button content-desc="Show balance — requires passcode" (resource-id)
 *   notif-btn             → Button content-desc="Notifications" (resource-id)
 *   theme-toggle          → Switch (resource-id)
 *   "Transfer"            → Button content-desc="Transfer" (quick action)
 *   Bottom nav tabs       → View content-desc=", Home|Transfer|Cards|Transactions|Profile"
 */
class HomePage extends BasePage {
  // ─── Selectors ────────────────────────────────────────────────────────────

  get greetingText() {
    return $('android=new UiSelector().text("Good morning,")');
  }

  get totalBalanceLabel() {
    return $('android=new UiSelector().text("Total Balance")');
  }

  get balanceEyeButton() {
    return $('android=new UiSelector().resourceId("balance-eye-btn")');
  }

  get themeToggle() {
    return $('android=new UiSelector().resourceId("theme-toggle")');
  }

  get notificationsButton() {
    return $('android=new UiSelector().resourceId("notif-btn")');
  }

  get quickActionsLabel() {
    return $('android=new UiSelector().text("Quick Actions")');
  }

  // Quick action buttons (content-desc observed directly)
  get transferQuickAction() {
    return $('android=new UiSelector().description("Transfer")');
  }

  get chatQuickAction() {
    return $('android=new UiSelector().description("Chat")');
  }

  get scanQRQuickAction() {
    return $('android=new UiSelector().description("Scan QR")');
  }

  // ─── Bottom Navigation ────────────────────────────────────────────────────
  // content-desc values have a leading ", " prefix (e.g. ", Home")

  get homeNavTab() {
    return $('android=new UiSelector().descriptionContains(", Home")');
  }

  get transferNavTab() {
    return $('android=new UiSelector().descriptionContains(", Transfer")');
  }

  get cardsNavTab() {
    return $('android=new UiSelector().descriptionContains(", Cards")');
  }

  get transactionsNavTab() {
    return $('android=new UiSelector().descriptionContains(", Transactions")');
  }

  get profileNavTab() {
    return $('android=new UiSelector().descriptionContains(", Profile")');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async isDashboardDisplayed() {
    return this.isDisplayed('android=new UiSelector().text("Total Balance")');
  }

  async isGreetingDisplayed() {
    return this.isDisplayed('android=new UiSelector().text("Good morning,")');
  }

  async waitForDashboard() {
    await this.waitForElement('android=new UiSelector().text("Total Balance")', 15000);
  }

  async navigateToTransfer() {
    await this.tap('android=new UiSelector().descriptionContains(", Transfer")');
  }

  async navigateToTransactions() {
    await this.tap('android=new UiSelector().descriptionContains(", Transactions")');
  }

  async navigateToCards() {
    await this.tap('android=new UiSelector().descriptionContains(", Cards")');
  }

  async navigateToProfile() {
    await this.tap('android=new UiSelector().descriptionContains(", Profile")');
  }

  async tapTransferQuickAction() {
    await this.tap('android=new UiSelector().description("Transfer")');
  }
}

module.exports = new HomePage();
