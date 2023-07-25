import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-todo-archive-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>
      <input type="checkbox" disabled [checked]="todo.done" />
      {{ todo.text }}
    </label>

    <button (click)="buttonClick.emit(todo.id)">Unarchive</button>
  `,
  styles: [],
})
export class TodoArchiveItemComponent {
  @Input()
  todo!: Todo;

  @Output()
  buttonClick = new EventEmitter<number>();
}
