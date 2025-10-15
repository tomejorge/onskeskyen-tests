import { test, expect } from '../fixtures/base';

const productLink =
  'https://www.proshop.dk/LEGO/LEGO-Technic-42215-Volvo-EC500-Hybrid-gravemaskine/3340378';
test.describe('Wishlist tests', () => {
  test('Can create wishlis and add product to it', async ({
    page,
    userDashboard,
    createWishlist,
    addWish,
    uniqueId,
  }) => {
    await page.goto('');
    await page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://onskeskyen.dk' });
    await page.evaluate(async (link) => navigator.clipboard.writeText(link), productLink);
    await userDashboard.createWishlistButton.click();
    await createWishlist.forMeButton.click();
    const uniqueWishlistName = `wishlist-${uniqueId}`;
    await createWishlist.wishlistTitleInput.fill(uniqueWishlistName);
    await createWishlist.createWishlistButton.click();
    await expect(userDashboard.getWishlistByName(uniqueWishlistName)).toBeVisible();
    await userDashboard.openWishlist(uniqueWishlistName);
    await addWish.createWishButton.click();
    await addWish.pasteButton.click();
    await addWish.addWishButton.click();
    await expect(addWish.wishSuccessMessage).toContainText('Wish created successfully')
  });
});
