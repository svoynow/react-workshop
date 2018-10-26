import { createStore } from "redux";
import { reducer } from './reducer';

const initialState = {
  newTodo: '',
  nowEditing: null,
  todos: [],
}

export const store = createStore(
  reducer, 
  initialState, 
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )