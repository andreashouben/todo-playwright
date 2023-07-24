import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'todo-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label
        >Enter a todo:<input type="text" formControlName="todo" />
        <div *ngIf="todo?.invalid && (todo?.dirty || todo?.touched)">
          <div *ngIf="todo?.errors?.['required']">Please enter a Todo.</div>
        </div>
      </label>
    </form>
  `,
  styles: [],
})
export class TodoFormComponent implements OnInit {
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
