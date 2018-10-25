import { Todo } from './interfaces';

const storageKey = 'typescript-todo-mvc';

export const save = (todos: Todo[]) => 
  localStorage.setItem(storageKey, JSON.stringify(todos));

export const load = (): Todo[] => {
  const todos = localStorage.getItem(storageKey);
  return todos ? JSON.parse(todos) : []
};
  

