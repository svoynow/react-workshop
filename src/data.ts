import uuidv4 from 'uuid/v4';
import { Todo, todoActive } from './interfaces';

export const makeTodo = (title: string): Todo => (
  {
    id: uuidv4(),
    status: todoActive,
    title
  }
);

export const addTodo = (todos: Todo[], title: string): Todo[] => 
  [...todos, makeTodo(title)];

export const deleteTodo = (todos: Todo[], todo: Todo): Todo[] =>
  todos.filter(t => t.id !== todo.id);

export const updateTodo = (todos: Todo[], todo: Todo): Todo[] =>
  todos.map(t => t.id === todo.id ? todo : t);

export const toggleAll = (todos: Todo[]): Todo[] => {
  const activeCount = todos.filter(t => t.status.kind === todoActive.kind).length;
  return todos.map(t => ({ ...t, completed: activeCount > 0 }));
};

export const deleteCompleted = (todos: Todo[]): Todo[] =>
  todos.filter(t => t.status.kind === todoActive.kind);