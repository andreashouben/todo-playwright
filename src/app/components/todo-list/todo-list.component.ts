import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { NEVER, Observable } from 'rxjs';

@Component({
  selector: 'todo-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TodoFormComponent],
  template: `
  <todo-todo-form></todo-todo-form>


  <section *ngIf="(todos$| async)?.length" title="todo-items">
      <h2>Todos</h2>
      <ul>
          <li *ngFor="let todoItem of todos$ | async">
              <todo-todo-item
                      [todo]="todoItem"
                      (check)="toggle($event)"
                      (buttonClick)="archive($event)"
              />
          </li>
      </ul>
  </section>


  `,
  styles: [``],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = NEVER;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  toggle(id: number) {
    this.todoService.toggle(id);
  }

  archive(id: number) {
    this.todoService.archiveTodo(id);
  }
}
