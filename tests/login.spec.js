const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
require('dotenv').config();

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test('Valid login using POM @smoke @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.loginAsValidUser();

  await expect(loginPage.getMessage())
    .toContainText('You logged into a secure area!');

  await expect(page).toHaveURL(/secure/);
});

test('Invalid login using POM @smoke @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login('wronguser', 'wrongpass');

  await expect(loginPage.getMessage())
    .toContainText('Your username is invalid!');
});

test('Login fails with empty fields @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login('', '');

  await expect(loginPage.getMessage())
    .toContainText('Your username is invalid!');
});