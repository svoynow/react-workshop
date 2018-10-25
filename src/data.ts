import uuidv4 from 'uuid/v4'
import { Todo, todoActive } from './interfaces';
import { 
  load as loadFromStorage,
  save as saveToStorage
} from './storage';

export interface Data {
  todos: Todo[]
  newTodo: string,
  nowEditing: Todo | null
};

export const makeTodo = (title: string) => (
  {
    id: uuidv4(),
    status: todoActive,
    title
  }
);

export const load = (): Todo[] =>
  loadFromStorage();

export const save = (todos: Todo[]) => {
  saveToStorage(todos);
  return todos;
};
