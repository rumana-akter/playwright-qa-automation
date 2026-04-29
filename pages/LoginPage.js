class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#username');
      this.passwordInput = page.locator('#password');
      this.loginButton = page.getByRole('button', { name: 'Login' });
      this.flashMessage = page.locator('#flash');
    }
  
    async goto() {
        await this.page.goto(process.env.BASE_URL + '/login');
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  
    getMessage() {
      return this.flashMessage;
    }
  }
  
  module.exports = LoginPage;