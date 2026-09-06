import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users, products } from '../fixtures/testData';

test.describe('Shopping cart', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('adding a product updates the cart badge', async () => {
    await inventoryPage.addProductToCart(products.backpack);

    await inventoryPage.expectCartCount(1);
  });

  test('adding multiple products accumulates the cart count', async () => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.bikeLight);
    await inventoryPage.addProductToCart(products.boltTShirt);

    await inventoryPage.expectCartCount(3);
  });

  test('added product is visible in the cart page', async ({ page }) => {
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.goToCart();

    await cartPage.expectItemInCart(products.backpack);
  });

  test('removing an item from the cart clears the badge', async ({ page }) => {
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.removeItem(products.backpack);

    await inventoryPage.goto();
    await inventoryPage.expectCartCount(0);
  });

  test('sorting by price low to high orders items ascending', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getDisplayedPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });
});
