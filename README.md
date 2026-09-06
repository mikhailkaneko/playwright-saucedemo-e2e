# Playwright SauceDemo E2E Test Suite

[![Playwright Tests](https://github.com/mikhailkaneko/playwright-saucedemo-e2e/actions/workflows/playwright.yml/badge.svg)](https://github.com/mikhailkaneko/playwright-saucedemo-e2e/actions)

An end-to-end automated test suite for [SauceDemo](https://www.saucedemo.com), a public e-commerce demo application. Built with **Playwright** and **TypeScript** using the **Page Object Model (POM)**, with tests running automatically on every push via **GitHub Actions**.

## Project Overview

SauceDemo is a sample e-commerce web application (login, product catalog, shopping cart, checkout) commonly used for QA automation practice. This project automates the application's core user journeys — authentication, cart management, and checkout — to demonstrate a maintainable, real-world test automation framework rather than a single script.

The goal of this project is to show solid automation practices: a clean Page Object structure, meaningful assertions, negative-path coverage, and a CI pipeline — not just "happy path" clicking.

## Tech Stack

- **Playwright** — browser automation and test runner
- **TypeScript** — static typing for test and page-object code
- **Page Object Model (POM)** — separates page interactions from test logic
- **GitHub Actions** — CI pipeline that runs the full suite on every push/PR
- **Node.js** — runtime

## Test Coverage

| Area | Scenarios |
|---|---|
| Authentication | Valid login, invalid credentials, locked-out user, missing password |
| Shopping cart | Add single/multiple items, cart badge count, remove item, price sorting |
| Checkout | Complete order with valid data, blocked checkout on missing required field |

- **13 test cases** across 3 spec files
- Runs cross-browser: **Chromium, Firefox, WebKit**
- Covers both **positive and negative** scenarios (not just happy paths)
- HTML report with screenshots/video/trace generated automatically on failure

## Setup Instructions

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/mikhailkaneko/playwright-saucedemo-e2e.git
cd playwright-saucedemo-e2e

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Run the full suite (headless)
npm test

# Optional: run with a visible browser
npm run test:headed

# Optional: interactive UI mode
npm run test:ui

# View the last HTML report
npm run report
```

## Project Structure

```
├── pages/            # Page Object classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
├── tests/            # Test specs (login, cart, checkout)
├── fixtures/         # Shared test data (users, products, checkout info)
├── .github/workflows/# CI pipeline definition
└── playwright.config.ts
```

## About Me

I recently completed the Microsoft Junior QA/Software Tester certification and I'm transitioning into QA after several years running my own e-commerce and clothing business — managing suppliers, order fulfillment, and customer-facing operations. That background gave me a close, practical understanding of how e-commerce flows (like the ones tested here) actually work and where they tend to break, which now translates directly into attention to detail, structured thinking, and clear defect documentation in QA.

**Toolkit:** Playwright · Postman · SQL · Jira · Zephyr · Azure DevOps · BrowserStack

[LinkedIn](#) · [Resume](#)
