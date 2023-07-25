import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoArchiveComponent } from './components/todo-archive/todo-archive.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TodoListComponent,
    ReactiveFormsModule,
    TodoArchiveComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
