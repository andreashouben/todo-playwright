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

  toggle(id: number) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );
    this._todos$.next(this.todos);
  }
  archiveTodo(id: number) {
    const [[toArchive], todos] = partition(
      (todo) => todo.id === id,
      this.todos,
    );
    this.todos = todos;

    this.archive = [...this.archive, toArchive];
    this._todos$.next(this.todos);
    this._archive$.next(this.archive);
  }

  unarchiveTodo(id: number) {
    const [[todo], archive] = partition((todo) => todo.id === id, this.archive);
    this.todos = [...this.todos, todo];
    this.archive = archive;
    this._todos$.next(this.todos);
    this._archive$.next(this.archive);
  }
}
