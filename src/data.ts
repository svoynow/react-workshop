import uuidv4 from 'uuid/v4'
import { Todo, todoActive, todoComplete } from './interfaces';

export interface Data {
  todos: Todo[]
};

export const makeTodo = (title: string) => (
  {
    id: uuidv4(),
    status: todoActive,
    title
  }
);

export const addTodo = (data: Data, todo: Todo) => (
  { ...data, todos: [...data.todos, todo] }
);

export const removeTodo = (data: Data, todo: Todo) => (
  { ...data, todos: data.todos.filter(t => t.id !== todo.id) }
);

export const updateTodo = (data: Data, todo: Todo) => (
  { ...data, todos: data.todos.map(t => t.id === todo.id ? todo : t) }
);

export const toggleAll = (data: Data) => {
  const activeCount = data.todos.filter(t => t.status === todoActive).length;
  const status = activeCount > 0 ? todoComplete : todoActive;  
  return { ...data, todos: data.todos.map(t => ({ ...t, status }))};
};

export const clearCompleted = (data: Data) => (
  { ...data, todos: data.todos.filter(t => t.status === todoActive) }
)
