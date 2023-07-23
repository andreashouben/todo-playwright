import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'todo-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>Enter a todo:<input type="text" formControlName="todo" /></label>
    </form>
    {{ form.getRawValue() | json }}
    <ul>
      <li *ngFor="let todoItem of todos">
        {{ todoItem.text }}
      </li>
    </ul>`,
  styles: [``],
})
export class TodoListComponent implements OnInit {
  form = this.fb.group({
    todo: ['', Validators.required],
  });

  todos: Todo[] = [];
  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  onSubmit() {
    const text = this.form.get('todo')?.value!;
    this.todoService.addTodo({ text });
    this.form.reset();
    this.todos = this.todoService.getTodos();
  }
}
