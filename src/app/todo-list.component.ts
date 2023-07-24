import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoItemComponent } from './todo-item.component';
import { TodoFormComponent } from './todo-form.component';

@Component({
  selector: 'todo-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TodoFormComponent],
  template: ` <todo-todo-form></todo-todo-form>
    <ul>
      <li *ngFor="let todoItem of todos">
        <todo-todo-item [todo]="todoItem" />
      </li>
    </ul>`,
  styles: [``],
})
export class TodoListComponent {
  form = this.fb.group({
    todo: ['', Validators.required],
  });

  get todo() {
    return this.form.get('todo');
  }

  todos: Todo[] = [];
  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
  ) {}
}
