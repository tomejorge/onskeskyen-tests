import { test, expect } from '../fixtures/base';

test.use({ useStorageState: false });
test.describe('User tests', () => {
  test('can create new user and enter dashboard', async ({
    page,
    navBar,
    login,
    register,
    modal,
    userDashboard,
    welcomeModal,
    uniqueUsername,
    testPassword,
  }) => {
    await page.goto('');
    await login.acceptCookiesButton.click();
    await navBar.signUpButton.click();
    await login.registerWithEmailButton.click();
    await login.fillNewUserDetails(uniqueUsername, testPassword);
    await register.fillUserData({
      firstName: 'Test123',
      lastName: 'User',
      month: 'jan.',
      day: '3',
      year: '2007',
      gender: 'Andet',
    });
    await register.createAccountButton.click();
    await expect(welcomeModal.congratulationsViewContainer).toContainText('Download');
    await expect(modal.content).toHaveScreenshot('new-user-welcome-modal.png')
    await welcomeModal.closeButton.click();
    await expect(userDashboard.userProfileHeader).toBeVisible();
    await expect(navBar.navBar).toHaveScreenshot('nav-bar-logged-in.png')
  });
});