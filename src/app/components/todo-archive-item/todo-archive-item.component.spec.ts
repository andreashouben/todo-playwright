import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoArchiveItemComponent } from './todo-archive-item.component';

describe('TodoArchiveItemComponent', () => {
  let component: TodoArchiveItemComponent;
  let fixture: ComponentFixture<TodoArchiveItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoArchiveItemComponent]
    });
    fixture = TestBed.createComponent(TodoArchiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
