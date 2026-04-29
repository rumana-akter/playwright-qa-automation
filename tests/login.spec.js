const { test, expect } = require('@playwright/test');

test('Verify successful login with valid credentials', async ({ page }) => {
  // Known-good demo user for https://the-internet.herokuapp.com/login
  const username = 'tomsmith';
  const password = 'SuperSecretPassword!';

  // Given: open the login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // When: submit valid credentials (prefer accessible selectors over raw IDs/CSS)
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  // Then: user sees the secure-area confirmation (banner copy from the app)
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});

test('Verify login fails with valid username and invalid password', async ({ page }) => {
  const username = 'tomsmith';
  const wrongPassword = 'NotTheRightPassword!';

  // Given: open the login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // When: submit correct username with a wrong password
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(wrongPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  // Then: user stays on login flow and sees the password error banner
  await expect(page.getByText('Your password is invalid!')).toBeVisible();
});

test('Verify login fails with invalid username (wrong user / wrong password)', async ({ page }) => {
  const invalidUsername = 'wronguser';
  const invalidPassword = 'wrongpass';

  // Given: open the login page
  await page.goto('https://the-internet.herokuapp.com/login');

  // When: submit credentials that do not match any valid user
  await page.getByLabel('Username').fill(invalidUsername);
  await page.getByLabel('Password').fill(invalidPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  // Then: demo app reports invalid username (checked before password on this page)
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});