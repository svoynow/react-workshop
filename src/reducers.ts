import { State } from './interfaces';
import { Action } from './newActions'

export const processAction = (state: State = { data: [] }, action: Action): State => {
  switch(action.type) {
    case 'DeleteTodoSuccess': 
      return { data: state.data.filter(t => t.id !== action.payload.id) };
    case 'CreateTodoSuccess':
      return { data: [...state.data, action.payload] };
    case 'UpdateTodoSuccess':
      return { data: state.data.map(t => t.id === action.payload.id ? action.payload : t)};
    case 'LoadTodosSuccess':
      return { data: action.payload };  
    case 'DeleteTodoFailure':
    case 'CreateTodoFailure':
    case 'UpdateTodoFailure':
    case 'LoadTodosFailure':
      // tslint:disable no-console
      console.log(`error ${action}`); 
      return state; 
  }
  return state;
}