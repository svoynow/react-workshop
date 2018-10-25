import uuidv4 from 'uuid/v4'
import { Todo, todoActive, todoComplete } from './interfaces';
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

export const addTodo = (data: Data, todo: Todo) => {
  const result =  { ...data, todos: [...data.todos, todo] };
  save(result);
  return result;
};

export const removeTodo = (data: Data, todo: Todo) => {
  const result = { ...data, todos: data.todos.filter(t => t.id !== todo.id) };
  save(result);
  return result;
};

export const updateTodo = (data: Data, todo: Todo) => {
  const result =  { ...data, todos: data.todos.map(t => t.id === todo.id ? todo : t) };
  save(result);
  return result;
};

export const toggleAll = (data: Data) => {
  const activeCount = data.todos.filter(t => t.status === todoActive).length;
  const status = activeCount > 0 ? todoComplete : todoActive;  
  const result = { ...data, todos: data.todos.map(t => ({ ...t, status }))};
  save(result);
  return result;
};

export const clearCompleted = (data: Data) => {
  const result = { ...data, todos: data.todos.filter(t => t.status === todoActive) };
  save(result);
  return result;
};

export const load = (): Data =>
  loadFromStorage();

const save = (data: Data) => saveToStorage(data)

