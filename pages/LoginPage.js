class LoginPage {
    constructor(page) {
      this.page = page;
      this.username = '#username';
      this.password = '#password';
      this.loginBtn = 'button[type="submit"]';
      this.flashMsg = '#flash';
    }
  
    async goto() {
      await this.page.goto('https://the-internet.herokuapp.com/login');
    }
  
    async login(username, password) {
      await this.page.locator(this.username).fill(username);
      await this.page.locator(this.password).fill(password);
      await this.page.locator(this.loginBtn).click();
    }
  
    async getMessage() {
      return this.page.locator(this.flashMsg);
    }
  }
  
  module.exports = LoginPage;