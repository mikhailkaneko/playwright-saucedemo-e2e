import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../fixtures/testData';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can log in with valid credentials', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.expectLoaded();
  });

  test('login is rejected with invalid credentials', async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('locked out user sees a clear error message', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await loginPage.expectErrorMessage('this user has been locked out');
  });

  test('login is rejected when password is missing', async () => {
    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.loginButton.click();

    await loginPage.expectErrorMessage('Password is required');
  });
});
