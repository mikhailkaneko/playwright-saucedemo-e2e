import { type Locator, type Page, expect } from '@playwright/test';

/**
 * Page Object covering the two-step SauceDemo checkout flow:
 * "Your Information" -> "Checkout Overview" -> "Complete".
 */
export class CheckoutPage {
  readonly page: Page;

  // Step one: information form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step two: overview
  readonly finishButton: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTotal: Locator;

  // Step three: confirmation
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.errorMessage = page.locator('[data-test="error"]');

    this.finishButton = page.locator('#finish');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTotal = page.locator('.summary_total_label');

    this.completeHeader = page.locator('.complete-header');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async expectValidationError(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText(/thank you for your order/i);
  }
}
