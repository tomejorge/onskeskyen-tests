import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { test as setup } from '@playwright/test';

import { Login } from '../pages';
import { authStorageStatePath } from './storageState';

const envFile = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile, override: true });
}

const loginEmail = process.env.TEST_LOGIN_EMAIL;
const loginPassword = process.env.TEST_LOGIN_PASSWORD;

if (!loginEmail || !loginPassword) {
  throw new Error(
    'Missing TEST_LOGIN_EMAIL or TEST_LOGIN_PASSWORD environment variables for login setup.',
  );
}

setup('authenticate user and capture storage state', async ({ page }) => {
  const login = new Login(page);
  await login.login(loginEmail, loginPassword);
  await login.navBar.userProfileAvatar.waitFor({ state: 'visible' });
  await fs.promises.mkdir(path.dirname(authStorageStatePath), { recursive: true });
  await page.context().storageState({ path: authStorageStatePath });
});
