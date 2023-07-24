import { TestBed } from '@angular/core/testing';

import { AddTodo, TodoService } from './todo.service';
import { firstValueFrom } from 'rxjs';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('returns an empty list of todos initially', async () => {
    expect(await firstValueFrom(service.todos$)).toEqual([]);
  });

  describe('after adding one todo', () => {
    const todoToAdd: AddTodo = { text: 'Clean Garage' };
    beforeEach(() => {
      service.addTodo(todoToAdd);
    });

    it('returns a list containing the todo', async () => {
      const expectedTodo: Todo = {
        id: 0,
        text: todoToAdd.text,
        done: false,
      };

      const [actualTodo] = await firstValueFrom(service.todos$);

      expect(actualTodo).toEqual(expectedTodo);
    });

    it('can mark a todo as done', async () => {
      const expectedTodo: Todo = {
        id: 0,
        text: todoToAdd.text,
        done: true,
      };
      const [addedTodo] = await firstValueFrom(service.todos$);

      service.markAsDone(addedTodo.id);
      const [doneTodo] = await firstValueFrom(service.todos$);

      expect(doneTodo).toEqual(expectedTodo);
    });

    it('can mark a done todo as undone', async () => {
      const expectedTodo: Todo = {
        id: 0,
        text: todoToAdd.text,
        done: false,
      };
      const [addedTodo] = await firstValueFrom(service.todos$);
      service.markAsDone(addedTodo.id);

      service.markAsUndone(addedTodo.id);
      const [unDoneTodo] = await firstValueFrom(service.todos$);

      expect(unDoneTodo).toEqual(expectedTodo);
    });

    it('can archive a todo', async () => {
      const [addedTodo] = await firstValueFrom(service.todos$);

      service.archiveTodo(addedTodo.id);

      const todos = await firstValueFrom(service.todos$);

      expect(todos).toEqual([]);
    });

    describe('with an archived todo', () => {
      beforeEach(async () => {
        const [addedTodo] = await firstValueFrom(service.todos$);

        service.archiveTodo(addedTodo.id);
      });

      it('lists archived todos', async () => {
        const expectedTodo: Todo = {
          id: 0,
          text: todoToAdd.text,
          done: false,
        };

        const archivedTodos = await firstValueFrom(service.archive$);

        expect(archivedTodos).toEqual([expectedTodo]);
      });

      it('unarchives todo', async () => {
        const [archivedTodo] = await firstValueFrom(service.archive$);

        service.unarchiveTodo(archivedTodo.id);

        expect(await firstValueFrom(service.archive$)).toEqual([]);
        expect(await firstValueFrom(service.todos$)).toEqual([archivedTodo]);
      });
    });
  });
});
