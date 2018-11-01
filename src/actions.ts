import { NowShowing, Todo } from './interfaces';

interface AddTodoAction {
  type: 'AddTodo',
  payload: Todo
};

export const addTodoAction = (todo: Todo): AddTodoAction => (
  { type: 'AddTodo', payload: todo }
);

interface DeleteTodoAction {
  type: 'DeleteTodo',
  payload: Todo
};

export const deleteTodoAction = (todo: Todo): DeleteTodoAction => (
  { type: 'DeleteTodo', payload: todo }
);

interface UpdateTodoAction {
  type: 'UpdateTodo',
  payload: Todo
}

export const updateTodoAction = (todo: Todo): UpdateTodoAction => (
  { type: 'UpdateTodo', payload: todo }
);

interface FetchTodosAction {
  type: 'FetchTodos'
};

export const fetchTodosAction = (): FetchTodosAction => (
  { type: 'FetchTodos' }
);

interface ToggleAllAction {
  type: 'ToggleAll',
  payload: NowShowing
};

export const toggleAllAction = (nowShowing: NowShowing): ToggleAllAction => (
  {
    payload: nowShowing,
    type: 'ToggleAll'
  }
);

interface ClearCompletedAction {
  type: 'ClearCompleted',
  payload: NowShowing
};

export const clearCompletedAction = (nowShowing: NowShowing): ClearCompletedAction => (
  {
    payload: nowShowing,
    type: 'ClearCompleted'
  }
);

export type Action =
    AddTodoAction
  | DeleteTodoAction
  | FetchTodosAction
  | UpdateTodoAction
  | ToggleAllAction
  | ClearCompletedAction



