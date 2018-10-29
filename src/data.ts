import { List } from 'immutable';
import { 
  load as loadFromStorage,
  save as saveToStorage
} from './storage';
import { Todo } from './todo';

export interface Data {
  todos: List<Todo>
  newTodo: string,
  nowEditing: Todo | null  
};

export const load = (): List<Todo> =>
  loadFromStorage();

export const save = (todos: List<Todo>): List<Todo> => {
  saveToStorage(todos);
  return todos;
};
