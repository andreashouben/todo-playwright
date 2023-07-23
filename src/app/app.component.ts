import { Component } from '@angular/core';

@Component({
  selector: 'todo-root',
  template: `<todo-todo-list />`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-playwright';
}
