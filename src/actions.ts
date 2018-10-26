import { Todo } from './interfaces';

interface LoadTodos {
  type: 'LoadTodos'
  payload: Todo[]
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
};

interface EnterNewTodo {
  type: 'EnterNewTodo',
  payload: string;
};

interface ClearNewTodo {
  type: 'ClearNewTodo'
}

interface StartEditing {
  type: 'StartEditing',
  payload: Todo
};

interface UpdateEditing {
  type: 'UpdateEditing',
  payload: string
};

interface FinishEditing {
  type: 'FinishEditing',
  payload: Todo
};

interface CancelEditing {
  type: 'CancelEditing'
};

export const loadTodosAction = (payload: Todo[]): LoadTodos => (
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

export const enterNewTodoAction = (payload: string): EnterNewTodo => (
  { type: 'EnterNewTodo', payload }
);

export const clearNewTodoAction: ClearNewTodo = { type: 'ClearNewTodo' }

export const startEditingAction = (payload: Todo): StartEditing => (
  { type: 'StartEditing', payload }
);

export const updateEditingAction = (payload: string): UpdateEditing => (
  { type: 'UpdateEditing', payload }
);

export const finishEditingAction = (payload: Todo): FinishEditing => (
  { type: 'FinishEditing', payload }
);

export const cancelEditingAction: CancelEditing = { type: 'CancelEditing' };

export type TodosAction =
    LoadTodos
  | CreateTodo
  | EditTodo
  | FinishEditing
  | DeleteTodo
  | ToggleAll
  | ClearCompleted

export type NewTodoAction =
    EnterNewTodo
  | ClearNewTodo

export type UpdateTodoAction =
    StartEditing
  | UpdateEditing
  | FinishEditing
  | CancelEditing

export type Action = 
    TodosAction 
  | NewTodoAction 
  | UpdateTodoAction
  