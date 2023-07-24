import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoItemComponent } from './todo-item.component';

@Component({
  selector: 'todo-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent],
  template: ` <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label
        >Enter a todo:<input type="text" formControlName="todo" />
        <div *ngIf="todo?.invalid && (todo?.dirty || todo?.touched)">
          <div *ngIf="todo?.errors?.['required']">Please enter a Todo.</div>
        </div>
      </label>
    </form>
    <ul>
      <li *ngFor="let todoItem of todos">
        <todo-todo-item [todo]="todoItem" />
      </li>
    </ul>`,
  styles: [``],
})
export class TodoListComponent implements OnInit {
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

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  onSubmit() {
    this.form.markAsTouched();
    if (this.form.valid) {
      const text = this.form.get('todo')?.value!;
      this.todoService.addTodo({ text });
      this.form.reset();
      this.todos = this.todoService.getTodos();
    }
  }
}
