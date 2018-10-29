import { List } from 'immutable';
import { Todo, todoFactory } from './todo';

const storageKey = 'typescript-todo-mvc';

export const save = (todos: List<Todo>): List<Todo> => {
  localStorage.setItem(storageKey, JSON.stringify(todos.toJSON()));
  return todos;
}

export const load = (): List<Todo> => {
  const todos = localStorage.getItem(storageKey);
  return todos ? List(JSON.parse(todos).map(todoFactory)) : List([])
};



