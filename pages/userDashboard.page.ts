import { expect, type Locator, type Page } from '@playwright/test';

export class UserDashboard {
  readonly page: Page;
  readonly userProfileHeader: Locator;
  readonly carouselWishLists: Locator;
  readonly createWishlistButton: Locator;
  readonly getWishlistByName: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.userProfileHeader = this.page.getByTestId('user-profile-header');
    this.carouselWishLists = this.page.getByTestId('carouselWishlists');
    this.createWishlistButton = this.page.getByTestId('plus-button').first();
    this.getWishlistByName = (name: string) => this.page.getByTestId(`wl-${name}`);
  }

  async openWishlist(name: string) {
    await this.getWishlistByName(name).click();
  }
}
