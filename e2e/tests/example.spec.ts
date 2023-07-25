import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByLabel('Enter a todo:').click();
  await page.getByLabel('Enter a todo:').fill('Feed the cat');
  await page.getByLabel('Enter a todo:').press('Enter');
  await page.getByLabel('Enter a todo:').fill('Feed the dog');
  await page.getByLabel('Enter a todo:').press('Enter');
  await page.getByLabel('Enter a todo:').fill('Buy milk');
  await page.getByLabel('Enter a todo:').press('Enter');
  await page.getByLabel('Enter a todo:').fill('Clean the garage');
  await page.getByLabel('Enter a todo:').press('Enter');
  await page.getByLabel('Feed the cat').check();
  await page.getByLabel('Feed the dog').check();
  await page.getByLabel('Buy milk').check();
  await page
    .locator('todo-todo-item')
    .filter({ hasText: 'Clean the garage Archive' })
    .getByRole('button')
    .click();
  await page
    .locator('todo-todo-item')
    .filter({ hasText: 'Buy milk Archive' })
    .getByRole('button')
    .click();
  await page
    .locator('todo-todo-item')
    .filter({ hasText: 'Feed the dog Archive' })
    .getByRole('button')
    .click();
  await page.getByRole('button', { name: 'Archive', exact: true }).click();
  await page
    .locator('todo-todo-archive-item')
    .filter({ hasText: 'Clean the garage Unarchive' })
    .getByRole('button')
    .click();
  await page
    .locator('todo-todo-archive-item')
    .filter({ hasText: 'Buy milk Unarchive' })
    .getByRole('button')
    .click();
  await page
    .locator('todo-todo-archive-item')
    .filter({ hasText: 'Feed the dog Unarchive' })
    .getByRole('button')
    .click();
  await page.getByRole('button', { name: 'Unarchive' }).click();
});
