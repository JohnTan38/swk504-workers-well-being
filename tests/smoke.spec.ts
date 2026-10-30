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
