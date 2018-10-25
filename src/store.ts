import { createStore } from "redux";
import { reducer } from './reducer';

const initialState = {
  newTodo: '',
  nowEditing: null,
  todos: [],
}

export const store = createStore(reducer, initialState)