const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Valid login using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');

  await expect(await loginPage.getMessage())
    .toContainText('You logged into a secure area!');

  await expect(page).toHaveURL(/secure/);
});

test('Invalid login using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wronguser', 'wrongpass');

  await expect(await loginPage.getMessage())
    .toContainText('Your username is invalid!');
});

test('Login fails with empty fields', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('', '');

  await expect(await loginPage.getMessage())
    .toContainText('Your username is invalid!');
});