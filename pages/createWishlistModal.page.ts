import { type Locator, type Page } from '@playwright/test';

export class CreateWishlistModal {
  readonly page: Page;
  readonly genericOptionsLocator: Locator;
  readonly forMeButton: Locator;
  readonly togetherButton: Locator;
  readonly onBehalfButton: Locator;
  readonly wishlistTitleInput: Locator;
  readonly createWishlistButton: Locator;



  constructor(page: Page) {
    this.page = page;
    this.genericOptionsLocator = this.page.locator('[class*="WishlistOption__Option"]');
    this.forMeButton = this.genericOptionsLocator.nth(0)
    this.togetherButton = this.genericOptionsLocator.nth(1)
    this.onBehalfButton = this.genericOptionsLocator.nth(2)
    this.wishlistTitleInput = this.page.getByTestId('create-wishlist-title-input')
    this.createWishlistButton = this.page.getByTestId('createWishlistSubmitButton')
  }
}