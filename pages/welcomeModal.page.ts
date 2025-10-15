import { type Locator, type Page } from '@playwright/test';
import { Modal } from './modal.page';

export class WelcomeModal {
  readonly page: Page;
  readonly modal: Modal;
  readonly closeButton: Locator;
  readonly congratulationsViewContainer: Locator;

  constructor(page: Page, modal = new Modal(page)) {
    this.page = page;
    this.modal = modal;
    this.closeButton = this.page.locator('[class*="CongatulationsView__CloseButtonContainer"]');
    this.congratulationsViewContainer = this.page.locator('[class*="RegisterStepContainer__Container"]');
  }
}
