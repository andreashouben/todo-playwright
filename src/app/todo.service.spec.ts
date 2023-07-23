import { TestBed } from '@angular/core/testing';

import { AddTodo, TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('returns an empty list of todos initially', () => {
    expect(service.getTodos()).toEqual([]);
  });

  describe('after adding one todo', () => {
    const todoToAdd: AddTodo = { text: 'Clean Garage' };
    beforeEach(() => {
      service.addTodo(todoToAdd);
    });

    it('returns a list containing the todo', () => {
      const expectedTodo: Todo = {
        id: 0,
        text: todoToAdd.text,
        done: false,
      };

      const [actualTodo] = service.getTodos();

      expect(actualTodo).toEqual(expectedTodo);
    });

    it('can mark a todo as done', () => {
      const expectedTodo: Todo = {
        id: 0,
        text: todoToAdd.text,
        done: true,
      };
      const [addedTodo] = service.getTodos();

      service.markAsDone(addedTodo.id);
      const [doneTodo] = service.getTodos();

      expect(doneTodo).toEqual(expectedTodo);
    });

    it('can mark a done todo as undone', () => {
      const expectedTodo: Todo = {
        id: 0,
        text: todoToAdd.text,
        done: false,
      };
      const [addedTodo] = service.getTodos();
      service.markAsDone(addedTodo.id);

      service.markAsUndone(addedTodo.id);
      const [unDoneTodo] = service.getTodos();

      expect(unDoneTodo).toEqual(expectedTodo);
    });

    it('can archive a todo', () => {
      const [addedTodo] = service.getTodos();

      service.archiveTodo(addedTodo.id);

      const todos = service.getTodos();

      expect(todos).toEqual([]);
    });

    describe('with an archived todo', () => {
      beforeEach(() => {
        const [addedTodo] = service.getTodos();

        service.archiveTodo(addedTodo.id);
      });

      it('lists archived todos', () => {
        const expectedTodo: Todo = {
          id: 0,
          text: todoToAdd.text,
          done: false,
        };

        const archivedTodos = service.getArchivedTodos();

        expect(archivedTodos).toEqual([expectedTodo]);
      });

      it('unarchives todo', () => {
        const [archivedTodo] = service.getArchivedTodos();

        service.unarchiveTodo(archivedTodo.id);

        expect(service.getArchivedTodos()).toEqual([]);
        expect(service.getTodos()).toEqual([archivedTodo]);
      });
    });
  });
});
