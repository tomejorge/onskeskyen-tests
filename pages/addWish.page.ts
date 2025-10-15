import { type Locator, type Page } from '@playwright/test';

export class AddWish {
  readonly page: Page;
  readonly createWishButton: Locator;
  readonly productLinkInput: Locator;
  readonly pasteButton: Locator;
  readonly addWishButton: Locator;
  readonly wishSuccessMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createWishButton = this.page.locator('[class*="ActionButton__Container"]');
    this.productLinkInput =  this.page.locator('[data-cy="new-wish-input-automatic"]');
    this.pasteButton =  this.page.getByRole('button', { name: 'Paste' })
    this.addWishButton =  this.page.getByTestId('new-wish-form-submit-btn')
    this.wishSuccessMessage =  this.page.locator('.ant-message-notice-content')
  }
}