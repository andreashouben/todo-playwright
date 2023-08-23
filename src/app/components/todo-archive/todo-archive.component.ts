import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { NEVER, Observable } from 'rxjs';
import { TodoArchiveItemComponent } from '../todo-archive-item/todo-archive-item.component';

@Component({
  selector: 'todo-todo-archive',
  standalone: true,
  imports: [CommonModule, TodoArchiveItemComponent],
  template: `
    <ng-container *ngIf="archive$ | async as archive">
      <ng-container *ngIf="archive.length > 0">
        <section title="todo-archive">
        <h2>Todo Archive</h2>
        <ul>
          <li *ngFor="let todo of archive">
            <todo-todo-archive-item
              [todo]="todo"
              (buttonClick)="unarchive($event)"
            ></todo-todo-archive-item>
          </li>
        </ul>
        </section>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class TodoArchiveComponent implements OnInit {
  archive$: Observable<Todo[]> = NEVER;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.archive$ = this.todoService.archive$;
  }

  unarchive(id: number) {
    this.todoService.unarchiveTodo(id);
  }
}
