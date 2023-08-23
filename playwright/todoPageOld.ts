import {Page} from "@playwright/test";

export class TodoPageOld {

  readonly todoInput;
  private readonly todoInputLabel = 'Enter a todo:';

  constructor(private readonly page:Page) {
    this.todoInput = page.getByLabel(this.todoInputLabel)
  }

  async goto(){
    await this.page.goto('http://localhost:4200')
  }

  async addTodo(todoText: string){
    await this.todoInput.click();
    await this.todoInput.fill(todoText);
    await this.todoInput.press('Enter');
  }

  async archiveTodo(todoText: string){
    await this.page
      .getByRole('listitem')
      .filter({hasText: todoText})
      .getByRole('button', {name: /archive/i})
      .click()
  }

  async unarchiveTodo(todoText: string){
      await this.page
          .getByRole('listitem')
          .filter({hasText: todoText})
          .getByRole('button', {name: /unarchive/i})
          .click()
  }



}
