import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test.describe('Static pages', () => {
    test('should navigate to the about page', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Revolutionary way to build the web',
        }),
      ).toBeVisible();

      await percySnapshot(page, 'Homepage');

      await page.getByRole('link', { name: 'About' }).click();

      await expect(page).toHaveURL('/about');
    });
  });
});
