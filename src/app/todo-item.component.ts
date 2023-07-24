import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: ` <div>{{ todo.text }}</div> `,
  styles: [``],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;
}
