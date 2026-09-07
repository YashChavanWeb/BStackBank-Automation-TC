// Load .env — works in both launcher and worker processes
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

// Resolve credentials: prefer env vars (CI), fall back to .env values already loaded above
const BS_USER = process.env.BROWSERSTACK_USERNAME;
const BS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const BS_APP = process.env.BS_APP_ID;
const platform = process.env.PLATFORM || 'android';

if (!BS_USER || !BS_KEY) {
  throw new Error('BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set in .env or environment');
}

const androidCapabilities = {
  platformName: 'android',
  'appium:deviceName': 'Samsung Galaxy S23',
  'appium:platformVersion': '13.0',
  'appium:app': BS_APP,
  'appium:automationName': 'UiAutomator2',
  'appium:noReset': false,
  'bstack:options': {
    userName: BS_USER,
    accessKey: BS_KEY,
    projectName: 'BStackBank Automation',
    buildName: `BStackBank Android - ${new Date().toISOString().split('T')[0]}`,
    sessionName: 'BStackBank Android Test',
    debug: true,
    networkLogs: true,
    deviceLogs: true,
    enableBiometric: true,
  },
};

const iosCapabilities = {
  platformName: 'ios',
  'appium:deviceName': 'iPhone 14',
  'appium:platformVersion': '16',
  'appium:app': BS_APP,
  'appium:automationName': 'XCUITest',
  'appium:noReset': false,
  'bstack:options': {
    userName: BS_USER,
    accessKey: BS_KEY,
    projectName: 'BStackBank Automation',
    buildName: `BStackBank iOS - ${new Date().toISOString().split('T')[0]}`,
    sessionName: 'BStackBank iOS Test',
    debug: true,
    networkLogs: true,
    deviceLogs: true,
  },
};

exports.config = {
  runner: 'local',
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',
  user: BS_USER,
  key: BS_KEY,

  specs: ['./features/**/*.feature'],
  exclude: [],

  maxInstances: 1,

  capabilities: [platform === 'ios' ? iosCapabilities : androidCapabilities],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['browserstack'],

  framework: 'cucumber',
  reporters: ['spec'],

  cucumberOpts: {
    require: ['./step-definitions/**/*.js'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
