import { test, expect } from '@playwright/test';

test.describe('SWK504 Men at Work Web Platform & Presentation Rig', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads home view with institutional branding and title', async ({ page }) => {
    await expect(page).toHaveTitle(/Men at Work | SWK504/i);
    await expect(page.locator('text=Singapore University of Social Sciences')).toBeVisible();
    await expect(page.locator('text=Men at Work')).toBeVisible();
  });

  test('navigates seamlessly between tabs', async ({ page }) => {
    // Navigate to Micro Groupwork
    await page.click('button:has-text("Micro Groupwork")');
    await expect(page.locator('text=Hupcey (1998) Social Support Theory')).toBeVisible();

    // Navigate to Community (Task 9)
    await page.click('button:has-text("Community (Task 9)")');
    await expect(page.locator('text=Boehm & Cnaan (2012) Practice Criteria')).toBeVisible();

    // Navigate to References
    await page.click('button:has-text("Academic Audit")');
    await expect(page.locator('text=Subramaniam et al. (2026)')).toBeVisible();
  });

  test('search auto-complete triggers and filters accurately', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Hupcey');
    await expect(page.locator('text=Social Support Theory (Hupcey 1998)')).toBeVisible();
  });

  test('slide presentation mode operates with timer and defense notes', async ({ page }) => {
    await page.click('button:has-text("Presentation Mode")');
    await expect(page.locator('text=Slide 1 of 4')).toBeVisible();
    
    // Test timer toggle
    const playBtn = page.locator('button[title*="Play"], button:has-text("Start Timer")');
    if (await playBtn.isVisible()) {
      await playBtn.click();
    }
    
    // Step to slide 4
    await page.click('button:has-text("Slide 4")');
    await expect(page.locator('text=Theoretical Basis & Therapeutic Factors')).toBeVisible();
    await expect(page.locator('text=Verbatim Presentation Script')).toBeVisible();
  });

  test('triggers slide takeaway markdown download', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.click('button:has-text("Takeaway"), button:has-text("Download")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.md');
  });
});