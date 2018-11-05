import { ThunkDispatch } from 'redux-thunk';
import * as Api from './api';
import { makeTodo } from './data';
import { NowShowing, State, Todo, todoActive, todoCompleted } from './interfaces';

export type Dispatch = ThunkDispatch<State, void, Action>;

export const fetchTodos = () => {
  return (dispatch: Dispatch) => {
    Api.getAllTodos()
      .then(todos => dispatch(loadTodosSuccess(todos)))
      .catch(err => dispatch(loadTodosFailure(err)))
  }
};

export const createTodo = (title: string) => {
  return (dispatch: Dispatch) => {
    Api.createTodo(makeTodo(title))
      .then(todo => dispatch(createTodoSuccess(todo)) )
      .catch(() => dispatch(createTodoFailure(title)))
  }
};

export const deleteTodo = (todo: Todo) => {
  return (dispatch: Dispatch) => {
    Api.deleteTodo(todo)
      .then(result => dispatch(deleteTodoSuccess(result)))
      .catch(() => dispatch(deleteTodoFailure(todo.title)))
  }
};

export const toggleAll = (todos: Todo[]) => {
  return (dispatch: Dispatch) => {
    const activeCount = todos.filter(t => t.status === todoActive).length;
    const status = activeCount > 0 ? todoCompleted : todoActive;  
    todos.forEach((todo: Todo) => {
      Api.updateTodo({ ...todo, status })
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

const deleteTodoSuccess = (payload: Todo): DeleteTodoSuccess => (
  {
    payload,
    type: 'DeleteTodoSuccess'
  }
)

const deleteTodoFailure = (payload: string): DeleteTodoFailure => (
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

const updateTodoSuccess = (payload: Todo): UpdateTodoSuccess => (
  {
    payload,
    type: 'UpdateTodoSuccess'
  }
)

const updateTodoFailure = (payload: string): UpdateTodoFailure => (
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

const createTodoSuccess = (payload: Todo): CreateTodoSuccess => (
  {
    payload,
    type: 'CreateTodoSuccess'
  }
)

const createTodoFailure = (payload: string): CreateTodoFailure => (
  {
    payload,
    type: 'CreateTodoFailure'
  }
)

interface LoadTodosSuccess {
  type: 'LoadTodosSuccess',
  payload: Todo[]
};

const loadTodosSuccess = (payload: Todo[]): LoadTodosSuccess => (
  {
    payload,
    type: 'LoadTodosSuccess',
  }
);

interface LoadTodosFailure {
  type: 'LoadTodosFailure',
  payload: string
};

const loadTodosFailure = (payload: string): LoadTodosFailure => (
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
  

