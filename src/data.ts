import uuidv4 from 'uuid/v4'
import { Todo } from './interfaces';

export class Data {

  static makeTodo = (title: string) => ({
    id: uuidv4(),
    status: 'Active',
    title
  });

  todos: Todo[];

  constructor(todos: Todo[]) {
    this.todos = todos;
  };

  addTodo = (todo: Todo) =>
    this.todos = [...this.todos, todo];

  removeTodo = (todo: Todo ) => 
    this.todos = this.todos.filter(t => t.id !== todo.id);

  updateTodo = (todo: Todo) =>
    this.todos = this.todos.map(t => t.id === todo.id ? todo : t);

  toggleAll = () => {
    const activeCount = this.todos.filter(t => t.status === 'Active').length;
    const status = activeCount > 0 ? 'Completed' : 'Active';
    this.todos = this.todos.map(t => ({ ...t, status }));
  };
}