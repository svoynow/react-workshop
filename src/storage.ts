import { Todo } from './interfaces';

const todoList = "todoList";

export const saveTodos = (data: Todo[]) =>
  localStorage.setItem(todoList, JSON.stringify(data));

export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(todoList);
  return data ? JSON.parse(data) : [];
};