# BStackBank Automation — Runner Guide

Complete setup and execution instructions for the WebdriverIO + Appium + Cucumber BDD test suite on BrowserStack App Automate.

---

## Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (bundled with Node.js)
- A **BrowserStack** account with App Automate access
- Your app binary (`.apk` for Android, `.ipa` for iOS)

---

## 1. Installation

```bash
# Clone the repository
git clone https://github.com/YashChavanWeb/BStackBank-Automation-TC.git
cd BStackBank-Automation-TC

# Install all dependencies
npm install
```

---

## 2. Environment Configuration

Create a `.env` file at the project root (already gitignored):

```bash
cp .env.example .env   # if .env.example exists, otherwise create manually
```

Edit `.env` and fill in your values:

```env
BROWSERSTACK_USERNAME=your_username_here
BROWSERSTACK_ACCESS_KEY=your_access_key_here
BS_APP_ID=bs://your_app_id_here
```

### How to get your BrowserStack credentials
1. Log in to [BrowserStack App Automate](https://app-automate.browserstack.com/)
2. Go to **Settings → Credentials**
3. Copy your **Username** and **Access Key**

### How to upload your app and get BS_APP_ID

**Option A — via BrowserStack dashboard:**
1. Go to [App Automate Upload](https://app-automate.browserstack.com/dashboard/v2/builds)
2. Click **Upload** and select your `.apk` / `.ipa`
3. Copy the `bs://` URL shown after upload

**Option B — via curl:**
```bash
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/your/app.apk"
```
Copy the `app_url` value from the JSON response into `BS_APP_ID`.

---

## 3. Running Tests

### Run all tests (Android, default)
```bash
npm test
```

### Run on Android explicitly
```bash
npm run test:android
```

### Run on iOS
```bash
npm run test:ios
```

### Run by tag

| Command | Runs |
|---|---|
| `npm run test:smoke` | All `@smoke` scenarios |
| `npm run test:regression` | All `@regression` scenarios |
| `npm run test:login` | All `@login` scenarios |
| `npm run test:transfer` | All `@transfer` scenarios |
| `npm run test:transactions` | All `@transactions` scenarios |

### Run a specific feature file
```bash
npx wdio run wdio.conf.js --spec features/login.feature
```

### Run a specific scenario by name
```bash
npx wdio run wdio.conf.js --cucumberOpts.name="Successful login with valid credentials"
```

### Run with a custom tag expression
```bash
npx wdio run wdio.conf.js --cucumberOpts.tagExpression='@smoke and not @wip'
```

---

## 4. Project Structure

```
BStackBank-Automation-TC/
├── features/                    # Gherkin feature files
│   ├── login.feature            # Login scenarios
│   ├── transfer.feature         # Fund transfer scenarios
│   └── transactions.feature     # Transaction history scenarios
│
├── step-definitions/            # Cucumber step implementations
│   ├── hooks.js                 # Before/After hooks (screenshots on failure)
│   ├── login.steps.js           # Login step definitions
│   ├── transfer.steps.js        # Transfer step definitions
│   └── transactions.steps.js    # Transaction history step definitions
│
├── page-objects/                # Page Object Models
│   ├── BasePage.js              # Shared utilities (tap, type, wait, scroll)
│   ├── LoginPage.js             # Login screen selectors + actions
│   ├── HomePage.js              # Home/Dashboard selectors + actions
│   ├── TransferPage.js          # Transfer screen selectors + actions
│   └── TransactionsPage.js      # Transaction history selectors + actions
│
├── config/
│   └── capabilities.js          # BrowserStack capability definitions
│
├── reports/
│   └── screenshots/             # Auto-saved failure screenshots
│
├── wdio.conf.js                 # WebdriverIO main configuration
├── package.json                 # Dependencies and npm scripts
├── .env                         # Credentials (gitignored — never commit)
└── RUNNER.md                    # This file
```

---

## 5. Available Tags

| Tag | Description |
|---|---|
| `@smoke` | Critical path — fast sanity check |
| `@regression` | Full regression suite |
| `@login` | Login feature scenarios |
| `@transfer` | Fund transfer scenarios |
| `@transactions` | Transaction history scenarios |
| `@valid-login` | Happy path login |
| `@invalid-login` | Negative login test |
| `@transfer-success` | Successful money transfer |
| `@transfer-quick-amount` | Transfer via quick-amount chip |
| `@transfer-with-remarks` | Transfer with optional remarks |
| `@transfer-cancel-auth` | Cancel during transaction authorization |
| `@transactions-list` | View transaction history screen |
| `@transactions-filter-debit` | Filter transactions by Debit |
| `@transactions-filter-credit` | Filter transactions by Credit |
| `@transactions-filter-transfer` | Filter transactions by Transfer |
| `@transactions-after-transfer` | Verify new transfer in history |
| `@wip` | Work in progress — excluded from CI |

---

## 6. Updating Selectors After Exploration

The page objects ship with **placeholder selectors**. After running an exploratory session with Test Companion:

1. Open the relevant page object in `page-objects/`
2. Replace `com.bstackbank:id/...` with the real `resource-id` values from the app
3. For iOS, replace the `-ios predicate string:name == "..."` values with real accessibility identifiers

**Finding real selectors:**
- Use Test Companion's exploratory session → `get_page_source` to inspect the XML
- Android: look for `resource-id` attributes
- iOS: look for `name` or `label` attributes on `XCUIElement*` nodes

---

## 7. CI/CD Integration

### GitHub Actions example

```yaml
name: BStackBank Mobile Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:smoke
        env:
          BROWSERSTACK_USERNAME: ${{ secrets.BROWSERSTACK_USERNAME }}
          BROWSERSTACK_ACCESS_KEY: ${{ secrets.BROWSERSTACK_ACCESS_KEY }}
          BS_APP_ID: ${{ secrets.BS_APP_ID }}
```

Add `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`, and `BS_APP_ID` as repository secrets in **Settings → Secrets and variables → Actions**.

---

## 8. Viewing Results

After a test run:
- **Terminal** — live spec reporter output
- **BrowserStack Dashboard** — [App Automate Dashboard](https://app-automate.browserstack.com/dashboard) — video, logs, screenshots per session
- **Local screenshots** — `reports/screenshots/` — auto-saved on scenario failure

---

## 9. Troubleshooting

| Error | Fix |
|---|---|
| `Invalid credentials` | Check `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` in `.env` |
| `App not found` | Re-upload the app and update `BS_APP_ID` in `.env` |
| `Element not found` | Run an exploratory session to capture real selectors; update page objects |
| `Session not created` | Check device/OS version in `wdio.conf.js` — use a currently available BrowserStack device |
| `Timeout waiting for element` | Increase `waitforTimeout` in `wdio.conf.js` or the specific `waitForElement` call |
