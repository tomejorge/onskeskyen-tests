import { type Locator, type Page } from '@playwright/test';
import { NavBar } from './navBar.page';

export class Login {
  readonly page: Page;
  readonly navBar: NavBar;
  readonly genericAntModalContent: Locator;
  readonly continueLoginWithEmailButton: Locator;
  readonly registerWithEmailButton;
  readonly emailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly signUpPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly createUserButton: Locator;
  readonly acceptCookiesButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page, navBar?: NavBar) {
    this.page = page;
    this.navBar = navBar ?? new NavBar(page);
    this.genericAntModalContent = this.page.locator('[class="ant-modal-body"]');
    this.continueLoginWithEmailButton = this.page.locator('[data-cy="registerNameNextButton"]');
    this.registerWithEmailButton = this.page.getByRole('button', {
      name: 'photo Fortsæt med e-mail',
    });
    this.emailInput = this.page.locator('[data-cy="signupEmailInput"]');
    this.loginPasswordInput = this.page.getByTestId('loginPasswordInput');
    this.signUpPasswordInput = this.page.locator('[data-cy="signupPasswordInput"]');
    this.loginButton = this.page.locator('[data-cy="registerNameNextButton"]');
    this.createUserButton = this.page.locator('[data-cy="registerNameNextButton"]').first();
    this.acceptCookiesButton = this.page.getByRole('button', { name: 'Accepter alle' });
    this.nextButton = this.page.getByRole('button', { name: 'Næste' });
  }

  async login(username: string, password: string) {
    await this.page.goto('');
    await this.acceptCookiesButton.click();
    await this.navBar.openLoginModal();
    await this.continueLoginWithEmailButton.click();
    await this.emailInput.fill(username);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async fillNewUserDetails(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.signUpPasswordInput.fill(password);
    await this.nextButton.click();
  }
}
