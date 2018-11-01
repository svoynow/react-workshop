import uuidv4 from 'uuid/v4';
import { Todo, todoActive } from './interfaces';
import { saveTodos } from './storage';

export const makeTodo = (title: string): Todo => (
  {
    id: uuidv4(),
    status: todoActive,
    title
  }
);

export const addTodo = (todos: Todo[], title: string): Todo[] => {
  const result = [...todos, makeTodo(title)];
  saveTodos(result);
  return result;
}

export const deleteTodo = (todos: Todo[], todo: Todo): Todo[] => {
  const result = todos.filter(t => t.id !== todo.id);
  saveTodos(result);
  return result;
}

export const updateTodo = (todos: Todo[], todo: Todo): Todo[] => {
  const result = todos.map(t => t.id === todo.id ? todo : t);
  saveTodos(result);
  return result;
}

export const toggleAll = (todos: Todo[]): Todo[] => {
  const activeCount = todos.filter(t => t.status.kind === todoActive.kind).length;
  const result = todos.map(t => ({ ...t, completed: activeCount > 0 }));
  saveTodos(result);
  return result;
};

export const deleteCompleted = (todos: Todo[]): Todo[] => {
  const result = todos.filter(t => t.status.kind === todoActive.kind);
  saveTodos(result);
  return result;
}