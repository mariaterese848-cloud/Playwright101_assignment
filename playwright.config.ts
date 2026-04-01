const { devices } = require('@playwright/test')
import dotenv from 'dotenv';

//require('dotenv').config();
dotenv.config();
const capabilities = {
  browserName: 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 10',
    build: 'Playwright 101 Build',
    name: 'Playwright Test',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: true,
    video: true,
    console: true
  }
};

const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;



// Playwright config to run tests on LambdaTest platform and local
const config = {
  testDir: './tests',
  retries: 1,
  use: {
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    connectOptions: {
      wsEndpoint
    }
    
  },
timeout: 60000,
projects: [
// -- LambdaTest Config --
  // name in the format: browserName:browserVersion:platform@lambdatest
  // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
    {
      name: 'chrome:latest:MacOS Catalina@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'chrome:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    },
  ]
}

module.exports = config