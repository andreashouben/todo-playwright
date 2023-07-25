import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>
      <input type="checkbox" (click)="checked($event)" [checked]="todo.done" />
      {{ todo.text }}
    </label>
    <button (click)="buttonClick.emit(todo.id)">Archive</button>
  `,
  styles: [``],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;

  @Output()
  check = new EventEmitter<number>();

  @Output()
  buttonClick = new EventEmitter<number>();

  checked($event: Event) {
    $event.preventDefault();
    this.check.emit(this.todo.id);
  }
}
