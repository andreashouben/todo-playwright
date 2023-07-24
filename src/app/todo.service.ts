import { Injectable } from '@angular/core';
import { partition } from 'ramda';
import { BehaviorSubject } from 'rxjs';

export type AddTodo = { text: string };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private archive: Todo[] = [];
  private nextIndex = 0;

  private _todos$ = new BehaviorSubject(this.todos);
  public todos$ = this._todos$.asObservable();
  private _archive$ = new BehaviorSubject(this.archive);
  public archive$ = this._archive$.asObservable();

  constructor() {}

  addTodo(addTodo: AddTodo) {
    const newTodo: Todo = {
      id: this.nextIndex++,
      text: addTodo.text,
      done: false,
    };
    this.todos = [...this.todos, newTodo];
    this._todos$.next(this.todos);
  }

  markAsDone(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done: true } : todo,
    );
    this._todos$.next(this.todos);
  }

  markAsUndone(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done: false } : todo,
    );
    this._todos$.next(this.todos);
  }

  archiveTodo(id: number) {
    const [archive, todos] = partition((todo) => todo.id === id, this.todos);
    this.todos = todos;
    this.archive = archive;
    this._todos$.next(this.todos);
    this._archive$.next(this.archive);
  }

  unarchiveTodo(id: number) {
    const [todos, archive] = partition((todo) => todo.id === id, this.archive);
    this.todos = todos;
    this.archive = archive;
    this._todos$.next(this.todos);
    this._archive$.next(this.archive);
  }
}
