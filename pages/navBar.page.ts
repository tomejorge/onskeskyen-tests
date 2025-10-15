import { type Locator, type Page } from '@playwright/test';

export class NavBar {
  readonly page: Page;
  readonly navBar: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;
  readonly friendsIcon: Locator;
  readonly userProfileAvatar: Locator;


  constructor(page: Page) {
    this.page = page;
    this.navBar = page.getByTestId('navBar');
    this.loginButton = this.navBar.locator('[class*="LoginButtonWrapper"]');
    this.signUpButton = this.navBar.locator('[class*="Button__Container"]').nth(1);
    // when logged in
    this.friendsIcon = this.navBar.locator('[class*="FriendsIcon"]');
    this.userProfileAvatar = this.page.getByTestId('navbarUserProfileAvatar')
  }

  async openLoginModal() {
    await this.loginButton.click();
  }
}
