import { combineReducers } from 'redux';
import { Action } from './actions';
import { save } from './data';
import { Todo, todoActive, todoComplete } from './interfaces';


const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch(action.type) {
    case 'LoadTodos': 
      return action.payload;

    case 'CreateTodo': 
      return save([...todos, action.payload]);

    case 'EditTodo': 
      return save(todos.map(t => t.id === action.payload.id ? action.payload : t));

    case 'DeleteTodo': 
      return save(todos.filter(t => t.id !== action.payload.id));

    case 'ToggleAll': 
      const activeCount = todos.filter(t => t.status === todoActive).length;
      const status = activeCount > 0 ? todoComplete : todoActive;  
      return save(todos.map(t => ({ ...t, status })));

    case 'ClearCompleted': 
      return save(todos.filter(t => t.status === todoActive));    
  }
  return todos;  
}

const newTodoReducer = (title: string = '', action: Action): string => {
  switch(action.type) {
    case 'EnterNewTodo': 
      return action.payload;
    case 'ClearNewTodo': 
      return '';
  }
  return title;
}

export const reducer = combineReducers({
  newTodo: newTodoReducer,
  todos: todosReducer,
});
