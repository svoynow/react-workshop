import { Data } from './data';

const storageKey = 'typescript-todo-mvc';

export const save = (data: Data) => 
  localStorage.setItem(storageKey, JSON.stringify(data));

export const load = (): Data => {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : { todos: [] }
};
  

