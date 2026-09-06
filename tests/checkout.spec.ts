import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, products, checkoutInfo } from '../fixtures/testData';

test.describe('Checkout flow', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();

    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('user can complete an order with valid information', async () => {
    await checkoutPage.fillInformation(
      checkoutInfo.valid.firstName,
      checkoutInfo.valid.lastName,
      checkoutInfo.valid.postalCode,
    );

    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderComplete();
  });

  test('checkout is blocked when required information is missing', async () => {
    await checkoutPage.fillInformation(
      checkoutInfo.missingLastName.firstName,
      checkoutInfo.missingLastName.lastName,
      checkoutInfo.missingLastName.postalCode,
    );

    await checkoutPage.expectValidationError('Last Name is required');
  });
});
