import { test, expect } from '@playwright/test';

test('app loads, navigates all five tabs, and filters the action register', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Empowering South Asian Migrant/i })).toBeVisible();
  await page.getByRole('button', { name: /2\. Micro Groupwork/i }).click();
  await expect(page.getByText(/First Session Circle Process/i)).toBeVisible();
  await page.getByRole('button', { name: /3\. Community Model/i }).click();
  await expect(page.getByText('MW-WSP Action-to-Resolution Register')).toBeVisible();
  await page.getByRole('button', { name: 'Resolved', exact: true }).click();
  await expect(page.getByText('REG-101')).toBeVisible();
  await expect(page.getByText('REG-102')).toHaveCount(0);
  await page.getByRole('button', { name: /4\. Slide Defense Rig/i }).click();
  await expect(page.getByText('Defense Simulator')).toBeVisible();
  await page.getByRole('button', { name: /5\. Academic Audit/i }).click();
  await expect(page.getByText('APA 7th Reference Audit & Methodological Integrity')).toBeVisible();
});


test('takeaway downloads the bundled PDF', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Download Takeaway' });
  await expect(link).toHaveAttribute('download', 'SWK504_Men_At_Work.pdf');
  await expect(link).toHaveAttribute('href', /SWK504_Men_At_Work\.pdf$/);
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    link.click(),
  ]);
  expect(download.suggestedFilename()).toBe('SWK504_Men_At_Work.pdf');
});

// Tile inspector mirrors the glass floating pop-up of the reference portfolio.
test('mouseover shows contextual details and leaving the tile hides the popup', async ({ page }) => {
  await page.goto('/');
  const firstTile = page.locator('[data-tooltip-title="MOM Workforce Context"]');
  await firstTile.hover();
  const popup = page.getByTestId('swk504-tile-popup');
  await expect(popup).toBeVisible();
  await expect(popup).toContainText('MOM Workforce Context');
  await expect(popup).toContainText('Construction');
  const rect = await popup.boundingBox();
  const viewport = page.viewportSize();
  expect(rect).toBeTruthy();
  expect(rect!.x).toBeGreaterThanOrEqual(0);
  expect(rect!.y).toBeGreaterThanOrEqual(0);
  expect(rect!.x + rect!.width).toBeLessThanOrEqual(viewport!.width + 2);
  expect(rect!.y + rect!.height).toBeLessThanOrEqual(viewport!.height + 2);
  await page.locator('header').hover({ position: { x: 6, y: 5 } });
  await expect(popup).toHaveCount(0);
});

test('tiles show keyboard-accessible details across tabs', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('[data-tooltip-title="MOM Workforce Context"]');
  await first.focus();
  await expect(page.getByRole('tooltip')).toContainText('MOM Workforce Context');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);

  await page.getByRole('button', { name: /2\. Micro Groupwork/i }).click();
  await page.locator('[data-tooltip-title="Universality"]').hover();
  await expect(page.getByRole('tooltip')).toContainText('shared');

  await page.getByRole('button', { name: /3\. Community Model/i }).click();
  await page.locator('[data-tooltip-title="Community Involvement"]').hover();
  await expect(page.getByRole('tooltip')).toContainText('Worker Community Advisory Council');

  await page.getByRole('button', { name: /4\. Slide Defense Rig/i }).click();
  await page.locator('[data-tooltip-title="Slide 2: Proposed Groupwork (Peer-Led Self-Help)"]').hover();
  await expect(page.getByRole('tooltip')).toContainText('Presentation');

  await page.getByRole('button', { name: /5\. Academic Audit/i }).click();
  await page.locator('[data-tooltip-title="Boehm & Cnaan (2012)"]').hover();
  await expect(page.getByRole('tooltip')).toContainText('community practice');
});


test('academic audit displays supplied QR and both APA 7 book citations', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /5\. Academic Audit/i }).click();
  await expect(page.getByRole('heading', { name: 'Core Groupwork Texts' })).toBeVisible();
  const qr = page.getByTestId('men-at-work-qr-code');
  await expect(qr).toBeVisible();
  await expect(qr).toHaveAttribute('src', /qr-code-men-at-work\.png$/);
  await expect.poll(() => qr.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole('link', { name: /Open project website/i })).toHaveAttribute('href', 'https://swk504-workers-well-being.vercel.app/');
  await expect(page.getByText(/Northen, H\., & Kurland, R\. \(2001\)/)).toBeVisible();
  await expect(page.getByText(/Toseland, R\. W\., & Rivas, R\. F\. \(2022\)/)).toBeVisible();
  await expect(page.getByText('Social work with groups')).toHaveCount(1);
  await expect(page.getByText('An introduction to group work practice')).toHaveCount(1);
  await page.locator('[data-tooltip-title="Toseland & Rivas (2022)"]').hover();
  await expect(page.getByRole('tooltip')).toContainText('groupwork practice');
});
