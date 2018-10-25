import { 
  addTodo,
  clearCompleted,
  Data,
  removeTodo,
  toggleAll,
  updateTodo
} from './data';
import { Todo } from './interfaces';

interface LoadTodos {
  type: 'LoadTodos'
  payload: Data
};

interface CreateTodo {
  type: 'CreateTodo',
  payload: Todo
};

interface EditTodo {
  type: 'EditTodo',
  payload: Todo
};

interface DeleteTodo {
  type: 'DeleteTodo',
  payload: Todo
};

interface ToggleAll {
  type: 'ToggleAll',
};

interface ClearCompleted {
  type: 'ClearCompleted';
}

export const loadTodosAction = (payload: Data): LoadTodos => (
  { type: 'LoadTodos', payload}
);

export const createTodoAction = (payload: Todo): CreateTodo => (
  { type: 'CreateTodo', payload}
);

export const editTodoAction = (payload: Todo): EditTodo => (
  { type: 'EditTodo', payload}
);

export const deleteTodoAction = (payload: Todo): DeleteTodo => (
  { type: 'DeleteTodo', payload}
);

export const toggleAllAction: ToggleAll = { type: 'ToggleAll' };

export const clearCompletedAction: ClearCompleted = { type: 'ClearCompleted' };

export type Action = 
    LoadTodos
  | CreateTodo
  | EditTodo
  | DeleteTodo
  | ToggleAll
  | ClearCompleted;

export const processAction = (data: Data, action: Action): Data => {
  switch(action.type) {
    case 'LoadTodos': return action.payload
    case 'CreateTodo': return addTodo(data, action.payload)
    case 'EditTodo': return updateTodo(data, action.payload)
    case 'DeleteTodo': return removeTodo(data, action.payload)
    case 'ToggleAll': return toggleAll(data)
    case 'ClearCompleted': return clearCompleted(data);
  }
  return data;
}
