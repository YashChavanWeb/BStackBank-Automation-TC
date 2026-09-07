const BasePage = require('./BasePage');

/**
 * TransactionsPage - Page Object for the Transactions history screen
 * Selectors verified via live exploratory session on Samsung Galaxy S23
 * App package: com.yash.bankingapp
 *
 * Verified selectors:
 *   "Transactions"        → TextView text (screen title)
 *   "Total In"            → TextView text (summary card label)
 *   "Total Out"           → TextView text (summary card label)
 *   "Balance"             → TextView text (summary card label)
 *   "Filter by All"       → Button content-desc
 *   "Filter by Credit"    → Button content-desc
 *   "Filter by Debit"     → Button content-desc
 *   "Filter by Transfer"  → Button content-desc
 *   "Filter by Payment"   → Button content-desc
 *   Transaction rows      → TextViews with name, amount, type, TXN id
 */
class TransactionsPage extends BasePage {
  // ─── Screen title ─────────────────────────────────────────────────────────

  get screenTitle() {
    return $('android=new UiSelector().text("Transactions")');
  }

  // ─── Summary cards ────────────────────────────────────────────────────────

  get totalInLabel() {
    return $('android=new UiSelector().text("Total In")');
  }

  get totalOutLabel() {
    return $('android=new UiSelector().text("Total Out")');
  }

  get balanceLabel() {
    return $('android=new UiSelector().text("Balance")');
  }

  // ─── Filter buttons ───────────────────────────────────────────────────────

  get filterAllButton() {
    return $('android=new UiSelector().description("Filter by All")');
  }

  get filterCreditButton() {
    return $('android=new UiSelector().description("Filter by Credit")');
  }

  get filterDebitButton() {
    return $('android=new UiSelector().description("Filter by Debit")');
  }

  get filterTransferButton() {
    return $('android=new UiSelector().description("Filter by Transfer")');
  }

  get filterPaymentButton() {
    return $('android=new UiSelector().description("Filter by Payment")');
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  async tapFilterAll() {
    await this.tap('android=new UiSelector().description("Filter by All")');
  }

  async tapFilterCredit() {
    await this.tap('android=new UiSelector().description("Filter by Credit")');
  }

  async tapFilterDebit() {
    await this.tap('android=new UiSelector().description("Filter by Debit")');
  }

  async tapFilterTransfer() {
    await this.tap('android=new UiSelector().description("Filter by Transfer")');
  }

  async tapFilterPayment() {
    await this.tap('android=new UiSelector().description("Filter by Payment")');
  }

  async isTransactionsScreenDisplayed() {
    return this.isDisplayed('android=new UiSelector().text("Transactions")');
  }

  async waitForTransactionsScreen() {
    await this.waitForElement('android=new UiSelector().text("Transactions")', 10000);
  }

  /**
   * Check if a transaction with the given TXN reference ID is visible.
   * @param {string} txnId - e.g. "TXN1788778927399"
   */
  async isTransactionVisible(txnId) {
    return this.isDisplayed(`android=new UiSelector().text("${txnId}")`);
  }

  /**
   * Check if a transaction row for a given recipient name is visible.
   * @param {string} name - e.g. "Aditya"
   */
  async isRecipientTransactionVisible(name) {
    return this.isDisplayed(`android=new UiSelector().text("${name}")`);
  }
}

module.exports = new TransactionsPage();
