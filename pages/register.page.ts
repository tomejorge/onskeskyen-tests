import { type Locator, type Page } from '@playwright/test';
import { Modal } from './modal.page';

export class Register {
  readonly page: Page;
  readonly modal: Modal;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly monthDropdown: Locator;
  readonly dayDropdown: Locator;
  readonly yearDropdown: Locator;
  readonly genderDropdown: Locator;
  readonly consentCheckbox: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page, modal = new Modal(page)) {
    this.page = page;
    this.modal = modal;
    this.firstNameInput = this.page.locator('[data-cy="registerFirstNameInput"]');
    this.lastNameInput = this.page.locator('[data-cy="registerLastNameInput"]');
    this.monthDropdown = this.page.locator('#registerSelectMonth');
    this.dayDropdown = this.page.locator('#registerSelectDay');
    this.yearDropdown = this.page.locator('#registerSelectYear');
    this.genderDropdown = this.page.locator('#rc_select_3');
    this.consentCheckbox = this.modal.content.locator('.ant-checkbox-input');
    this.createAccountButton = this.page.locator('[data-cy="registerNameNextButton"]');
  }

  async fillUserData({ firstName, lastName, month, day, year, gender }: RegisterUserDetails) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.monthDropdown.click();
    await this.page.getByTitle(month).click();
    await this.dayDropdown.click();
    await this.page.getByTitle(day).click();
    await this.yearDropdown.click();
    await this.page.getByTitle(year).click();
    await this.genderDropdown.click();
    await this.page.getByTitle(gender).click();
    await this.consentCheckbox.check();
  }
}

export type RegisterUserDetails = {
  firstName: string;
  lastName: string;
  month: string;
  day: string;
  year: string;
  gender: string;
  acceptConsent?: boolean;
};
