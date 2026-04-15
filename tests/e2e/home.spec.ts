import { test, expect } from '@playwright/test';

test('has title and greeting', async ({ page }) => {
  await page.goto('/de');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Andreas Hilgers/);

  // Check for the greeting
  const greeting = page.locator('text=Hallo, ich bin');
  await expect(greeting).toBeVisible();
});

test('theme switcher works', async ({ page }) => {
  await page.goto('/de');

  // Trigger dropdown
  await page.locator('button >> .lucide-sun, button >> .lucide-moon, button >> .lucide-tree-pine').click();
  
  // Select Dark theme
  await page.locator('text=Dark').click();
  
  // Check if html has data-theme='dark' or if theme changed
  // Note: next-themes might take a moment or use a cookie/localStorage
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'dark');
});
