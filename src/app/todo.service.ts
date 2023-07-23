import {Injectable} from '@angular/core';

export type AddTodo = { text: string }

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private todos: Todo[] = []
    private nextIndex = 0;

    constructor() {
    }

    getTodos() {
        return Object.seal([...this.todos]);
    }

    addTodo(addTodo: AddTodo) {
        const newTodo: Todo = {
            id: this.nextIndex++,
            text: addTodo.text,
            done: false
        }
        this.todos = [...this.todos, newTodo]
    }

    markAsDone(id: number) {
        this.todos = this.todos.map(todo => todo.id === id ? {...todo, done: true} : todo)
    }
}
