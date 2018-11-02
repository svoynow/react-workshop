import { ThunkDispatch } from 'redux-thunk';
import * as Api from './api';
import { NewTodo, NowShowing, State, Todo, todoActive, todoCompleted } from './interfaces';

export type Dispatch = ThunkDispatch<State, void, Action>;

export const fetchTodos = () => {
  return (dispatch: Dispatch) => {
    Api.getAllTodos()
      .then(todos => dispatch(loadTodosSuccess(todos)));
  }
};

export const addTodo = (todo: NewTodo) => {
  return (dispatch: Dispatch) => {
    Api.createTodo(todo)
      .then(created => dispatch(createTodoSuccess(created)))
  };
};

export const updateTodo = (todo: Todo) => {
  return (dispatch: Dispatch) => {
    Api.updateTodo(todo)
      .then(updated => dispatch(editTodoSuccess(updated)))
  };
};

export const deleteTodo = (todo: Todo) => {
  return (dispatch: Dispatch) => {
    Api.deleteTodo(todo)
      .then(() => dispatch(deleteTodoSuccess(todo)))
  }
}

export const toggleAll = (todos: Todo[]) => {
  return (dispatch: Dispatch) => {
    const activeCount = todos.filter(t => t.status === todoActive).length;
    const status = activeCount > 0 ? todoCompleted : todoActive;  
    todos.forEach((todo: Todo) => {
      Api.updateTodo({ ...todo, status })
        .then(updated => dispatch(editTodoSuccess(updated)))        
    });
  };
};

const deleteMany = (todos: Todo[]) => {
  return (dispatch: Dispatch) => {
    todos.forEach(t => deleteTodo(t)(dispatch))
  }
};

export const clearCompleted = (nowShowing: NowShowing) => {
  return (dispatch: Dispatch, getState: () => State) => {
    const { data } = getState();
    if (nowShowing.kind === 'Active') { 
      return;
    }
    deleteMany(data.filter(t => t.status === todoCompleted))(dispatch)
  }
}

export interface CreateTodoSuccess {
  type: 'CreateTodoSuccess',
  payload: Todo
};

export const createTodoSuccess = (payload: Todo): CreateTodoSuccess => (
  { type: 'CreateTodoSuccess', payload}
);

interface LoadTodosSuccess {
  type: 'LoadTodosSuccess',
  payload: Todo[]
};

export const loadTodosSuccess = (payload: Todo[]): LoadTodosSuccess => (
  { type: 'LoadTodosSuccess', payload}
);

export interface EditTodoSuccess {
  type: 'EditTodoSuccess',
  payload: Todo
};

export const editTodoSuccess = (payload: Todo): EditTodoSuccess => (
  { type: 'EditTodoSuccess', payload}
);

export interface DeleteTodoSuccess {
  type: 'DeleteTodoSuccess',
  payload: Todo
};

export const deleteTodoSuccess = (payload: Todo): DeleteTodoSuccess => (
  { type: 'DeleteTodoSuccess', payload}
);

export type Action = 
    LoadTodosSuccess
  | CreateTodoSuccess
  | EditTodoSuccess
  | DeleteTodoSuccess
