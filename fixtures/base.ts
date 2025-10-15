import fs from 'fs';
import { test as base, expect } from '@playwright/test';

import { CreateWishlistModal, Login, NavBar, UserDashboard, Register, Modal, WelcomeModal } from '../pages';
import { authStorageStatePath } from '../setup/storageState';

type PageFixtures = {
  createWishlistModal: CreateWishlistModal;
  login: Login;
  navBar: NavBar;
  userDashboard: UserDashboard;
  register: Register;
  modal: Modal;
  welcomeModal: WelcomeModal;
  uniqueUsername: string;
  testPassword: string;
};

type AuthFixtures = {
  useStorageState: boolean;
};

export const test = base.extend<PageFixtures, AuthFixtures>({
  useStorageState: [
    true,
    {
      option: true,
      scope: 'worker',
    },
  ],

  storageState: async ({ useStorageState }, use, workerInfo) => {
    const shouldUseState = useStorageState && workerInfo.project.name === 'chromium';

    if (shouldUseState && !fs.existsSync(authStorageStatePath)) {
      throw new Error(`Expected storage state at ${authStorageStatePath}.`);
    }

    if (shouldUseState) {
      await use(authStorageStatePath);
    } else {
      await use(undefined);
    }
  },

  createWishlistModal: async ({ page }, use) => {
    await use(new CreateWishlistModal(page));
  },

  login: async ({ page }, use) => {
    await use(new Login(page));
  },

  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },

  userDashboard: async ({ page }, use) => {
    await use(new UserDashboard(page));
  },
  register: async ({ page }, use) => {
    await use(new Register(page));
  },

  modal: async ({ page }, use) => {
    await use(new Modal(page));
  },
  welcomeModal: async ({ page }, use) => {
    await use(new WelcomeModal(page));
  },

  uniqueUsername: async ({}, use) => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 6);
    await use(`testuser${timestamp}@thisisadomain.com`);
  },
  testPassword: async ({}, use) => {
    const password = process.env.TEST_LOGIN_PASSWORD;
    if (!password) {
      throw new Error(
        'FATAL: TEST_LOGIN_PASSWORD is not set in the environment. Please check your .env.local file, or if you set it in the github secrets',
      );
    }
    await use(password);
  },
});

export { expect };
export { CreateWishlistModal, Login, NavBar, UserDashboard, Modal };
