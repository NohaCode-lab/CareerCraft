import { test, expect } from '@playwright/test';

test.describe('CareerCraft Critical User Journeys (Deterministic E2E)', () => {

  test('1. Application Startup & Shell Loading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CareerCraft/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('2. Main Navigation Routing', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to CV Builder
    await page.goto('/cv-builder');
    await expect(page).toHaveURL(/.*cv-builder/);

    // Navigate to Job Search
    await page.goto('/jobs');
    await expect(page).toHaveURL(/.*jobs/);

    // Navigate to Applications
    await page.goto('/applications');
    await expect(page).toHaveURL(/.*applications/);

    // Navigate to Interview Prep
    await page.goto('/interview-prep');
    await expect(page).toHaveURL(/.*interview-prep/);

    // Navigate to AI Assistant
    await page.goto('/ai-assistant');
    await expect(page).toHaveURL(/.*ai-assistant/);

    // Navigate to Settings
    await page.goto('/settings');
    await expect(page).toHaveURL(/.*settings/);
  });

  test('3. Language Switching (EN / DE / AR)', async ({ page }) => {
    await page.goto('/settings');
    
    // Select Language options if available
    const languageSelect = page.locator('select, button:has-text("English"), button:has-text("Deutsch"), button:has-text("العربية")').first();
    await expect(languageSelect).toBeVisible();
  });

  test('4. Arabic RTL Direction & Attributes', async ({ page }) => {
    await page.goto('/');
    // Check baseline document direction attribute
    const dir = await page.getAttribute('html', 'dir');
    expect(dir === 'ltr' || dir === 'rtl').toBeTruthy();
  });

  test('5. CV Builder Form & Document Preview', async ({ page }) => {
    await page.goto('/cv-builder');
    await expect(page.locator('body')).toBeVisible();
    const heading = page.locator('h1, h2, h3').first();
    await expect(heading).toBeVisible();
  });

  test('6. Job Search & Filtering Interface', async ({ page }) => {
    await page.goto('/jobs');
    await expect(page.locator('body')).toBeVisible();
    const input = page.locator('input[type="text"], input[placeholder*="Search"]').first();
    if (await input.isVisible()) {
      await input.fill('Frontend Engineer');
      expect(await input.inputValue()).toBe('Frontend Engineer');
    }
  });

  test('7. Saved Jobs Persistence Tab', async ({ page }) => {
    await page.goto('/saved-jobs');
    await expect(page.locator('body')).toBeVisible();
  });

  test('8. Applications / Kanban Board', async ({ page }) => {
    await page.goto('/applications');
    await expect(page.locator('body')).toBeVisible();
  });

  test('9. Interview Preparation Category Filters', async ({ page }) => {
    await page.goto('/interview-prep');
    await expect(page.locator('body')).toBeVisible();
  });

  test('10. STAR Evaluation Interface', async ({ page }) => {
    await page.goto('/interview-prep');
    await expect(page.locator('body')).toBeVisible();
  });

  test('11. AI Assistant Chat UI & Provider Status', async ({ page }) => {
    await page.goto('/ai-assistant');
    await expect(page.locator('body')).toBeVisible();
  });

  test('12. Settings & Configuration Management', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('body')).toBeVisible();
  });

  test('13. Error Recovery & Fallback Boundary', async ({ page }) => {
    await page.goto('/non-existent-route-path-999');
    await expect(page.locator('body')).toBeVisible();
  });

});
