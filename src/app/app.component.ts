import { Component } from '@angular/core';

@Component({
  selector: 'todo-root',
  template: `<todo-todo-list /> <todo-todo-archive />`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-playwright';
}
