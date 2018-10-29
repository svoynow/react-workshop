import { List } from 'immutable';
import { createStore } from "redux";
import { Data } from './data';
import { reducer } from './reducer';


const initialState: Data = {
  newTodo: '',
  nowEditing: null,
  todos: List(),  
};

export const store = createStore(
  reducer, 
  initialState, 
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )