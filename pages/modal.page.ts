import { type Locator, type Page } from '@playwright/test';

export class Modal {
  readonly page: Page;
  readonly content: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.content = this.page.locator('.ant-modal-content');
    this.closeButton = this.page.locator('.ant-modal-close');
  }

  async close(){
    await this.closeButton.click();
  }
};
