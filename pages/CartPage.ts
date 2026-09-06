import { type Locator, type Page, expect } from '@playwright/test';

/**
 * Page Object for the SauceDemo shopping cart page.
 */
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectItemInCart(productName: string) {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  async removeItem(productName: string) {
    await this.cartItems
      .filter({ hasText: productName })
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
