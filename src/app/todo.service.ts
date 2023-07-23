import { Injectable } from '@angular/core';
import { partition } from 'ramda';

export type AddTodo = { text: string };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private archive: Todo[] = [];
  private nextIndex = 0;

  constructor() {}

  getTodos() {
    return Object.seal([...this.todos]);
  }

  addTodo(addTodo: AddTodo) {
    const newTodo: Todo = {
      id: this.nextIndex++,
      text: addTodo.text,
      done: false,
    };
    this.todos = [...this.todos, newTodo];
  }

  markAsDone(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done: true } : todo,
    );
  }

  markAsUndone(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done: false } : todo,
    );
  }

  archiveTodo(id: number) {
    const [archive, todos] = partition((todo) => todo.id === id, this.todos);
    this.todos = todos;
    this.archive = archive;
  }

  unarchiveTodo(id: number) {
    const [todos, archive] = partition((todo) => todo.id === id, this.archive);
    this.todos = todos;
    this.archive = archive;
  }

  getArchivedTodos() {
    return Object.seal([...this.archive]);
  }
}
