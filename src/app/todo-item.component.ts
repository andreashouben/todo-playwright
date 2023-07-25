import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>
      <input type="checkbox" (click)="onCheck($event)" [checked]="todo.done" />
      {{ todo.text }}
    </label>
  `,
  styles: [``],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;

  @Output()
  onClick = new EventEmitter<number>();

  onCheck($event: Event) {
    $event.preventDefault();
    this.onClick.emit(this.todo.id);
  }
}
