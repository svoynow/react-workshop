import { ThunkDispatch } from 'redux-thunk';
import * as Api from './api';
import { NowShowing, State, Status, Todo, todoActive, todoCompleted } from './interfaces';

export type Dispatch = ThunkDispatch<State, void, Action>;
// tslint:disable no-console
export const fetchTodos = () => {
  return (dispatch: Dispatch) => {
    Api.getAllTodos()
      .then(todos => dispatch(loadTodosSuccess(todos)))
      .catch(err => dispatch(loadTodosFailure(err)))
  }
};

export const createTodo = (todo: Todo) => {
  return (dispatch: Dispatch) => {
    Api.createTodo(todo)
      .then(result => dispatch(createTodoSuccess(result)) )
      .catch(() => dispatch(createTodoFailure(todo.title)))
  }
};

export const deleteTodo = (todo: Todo) => {
  return (dispatch: Dispatch) => {
    console.log('deleteTodo')
    Api.deleteTodo(todo)
      .then(() => dispatch(deleteTodoSuccess(todo)))
      .catch(() => dispatch(deleteTodoFailure(todo.title)))
  }
};

export const toggleAll = (todos: Todo[], newStatus: Status) => {
  return (dispatch: Dispatch) => {
    todos.forEach((todo: Todo) => {
      Api.updateTodo({ ...todo, status: newStatus })
        .then(updated => dispatch(updateTodoSuccess(updated)))
        .catch(() => dispatch(updateTodoFailure(todo.title)))        
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

interface DeleteTodoSuccess {
  type: 'DeleteTodoSuccess',
  payload: Todo
};

interface DeleteTodoFailure {
  type: 'DeleteTodoFailure',
  payload: string
};

export const deleteTodoSuccess = (payload: Todo): DeleteTodoSuccess => (
  {
    payload,
    type: 'DeleteTodoSuccess'
  }
)

export const deleteTodoFailure = (payload: string): DeleteTodoFailure => (
  {
    payload,
    type: 'DeleteTodoFailure'
  }
)


export const updateTodo = (todo: Todo) => {
  return (dispatch: Dispatch) => {
    Api.updateTodo(todo)
      .then(result => dispatch(updateTodoSuccess(result)))
      .catch(() => dispatch(updateTodoFailure(todo.title)))
  }
}

interface UpdateTodoSuccess {
  type: 'UpdateTodoSuccess',
  payload: Todo
};

interface UpdateTodoFailure {
  type: 'UpdateTodoFailure',
  payload: string
};

export const updateTodoSuccess = (payload: Todo): UpdateTodoSuccess => (
  {
    payload,
    type: 'UpdateTodoSuccess'
  }
)

export const updateTodoFailure = (payload: string): UpdateTodoFailure => (
  {
    payload,
    type: 'UpdateTodoFailure'
  }
)

interface CreateTodoSuccess {
  type: 'CreateTodoSuccess',
  payload: Todo
};

interface CreateTodoFailure {
  type: 'CreateTodoFailure',
  payload: string
};

export const createTodoSuccess = (payload: Todo): CreateTodoSuccess => (
  {
    payload,
    type: 'CreateTodoSuccess'
  }
)

export const createTodoFailure = (payload: string): CreateTodoFailure => (
  {
    payload,
    type: 'CreateTodoFailure'
  }
)

interface LoadTodosSuccess {
  type: 'LoadTodosSuccess',
  payload: Todo[]
};

export const loadTodosSuccess = (payload: Todo[]): LoadTodosSuccess => (
  {
    payload,
    type: 'LoadTodosSuccess',
  }
);

interface LoadTodosFailure {
  type: 'LoadTodosFailure',
  payload: string
};

export const loadTodosFailure = (payload: string): LoadTodosFailure => (
  {
    payload,
    type: 'LoadTodosFailure',
  }
);

export type Action = 
    CreateTodoFailure
  | CreateTodoSuccess
  | LoadTodosSuccess
  | LoadTodosFailure
  | UpdateTodoSuccess
  | UpdateTodoFailure
  | DeleteTodoSuccess
  | DeleteTodoFailure
  

