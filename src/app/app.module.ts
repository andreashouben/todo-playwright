import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TodoListComponent} from "./todo-list.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TodoListComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
