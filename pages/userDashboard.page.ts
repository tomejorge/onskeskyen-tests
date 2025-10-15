import { expect, type Locator, type Page } from '@playwright/test';

export class UserDashboard {
  readonly page: Page;
  readonly userProfileHeader: Locator;
  readonly carouselWishLists: Locator;
  readonly createWishlistButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.userProfileHeader = this.page.getByTestId('user-profile-header')
    this.carouselWishLists = this.page.getByTestId('carouselWishlists')
    this.createWishlistButton = this.page.getByTestId('plus-button').first()
  }
}