import {expect, test} from '@playwright/test';
import {TodoPage} from "./todoPage";

test.describe('todo page', () => {

  let todoPage: TodoPage;

  test.beforeEach(async ({page}) => {
    todoPage = new TodoPage(page);
    await todoPage.goto()
  })

  test('can add a todo', async ({page}) => {
    const todoText = 'Feed the cat';

    await todoPage.addTodo(todoText);

    await expect(page.getByText(todoText)).toBeVisible()
  })

  test('can mark a todo as done', async ({page}) => {
    const todoText = 'Feed the cat';
    await todoPage.addTodo(todoText);

    await page.getByLabel(todoText).click()

    await expect(page.getByLabel(todoText)).toBeChecked()
  })

  test('can add multiple todos with the same text', async ({page}) => {
    const todoText = 'Feed the cat';
    await todoPage.addTodo(todoText);
    await todoPage.addTodo(todoText);

    await expect(page.getByText(todoText)).toHaveCount(2)
  })

  test('can archive a todo item', async ({page}) => {
    const todoText = 'Feed the cat';
    await todoPage.addTodo(todoText)

    await todoPage.archiveTodo(todoText)

    await expect(page.getByTitle('todo-archive').getByText(todoText)).toBeVisible()
  })

  test('keeps the done status for archived items', async ({page}) => {
    const todoText = 'Feed the cat';
    await todoPage.addTodo(todoText)
    await page.getByLabel(todoText).click()

    await todoPage.archiveTodo(todoText);

    await expect(page.getByTitle('todo-archive').getByLabel(todoText)).toBeChecked()
  })

  test('disables the checkbox for archived items', async ({page}) => {
    const todoText = 'Feed the cat';
    await todoPage.addTodo(todoText)
    await page.getByLabel(todoText).click()

    await todoPage.archiveTodo(todoText);

    await expect(page.getByTitle('todo-archive').getByLabel(todoText)).toBeDisabled()
  })

  test('re-enables the checkbox for unarchived items', async ({page}) =>{
    const todoText = 'Feed the dog';
    await todoPage.addTodo(todoText)
    await todoPage.archiveTodo(todoText)

    await todoPage.unarchiveTodo(todoText)

    await expect(page.getByLabel(todoText)).toBeEnabled()
  })



})


