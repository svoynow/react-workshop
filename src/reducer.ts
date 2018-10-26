import { combineReducers } from 'redux';
import { Action, NewTodoAction, TodosAction, UpdateTodoAction } from './actions';
import { Data, save } from './data';
import { Todo, todoActive, todoComplete } from './interfaces';


const todosReducer = (todos: Todo[] = [], action: TodosAction): Todo[] => {
  switch(action.type) {
    case 'LoadTodos': 
      return action.payload;

    case 'CreateTodo': 
      return save([...todos, action.payload]);

    case 'EditTodo': 
    case 'FinishEditing':
      return save(todos.map(t => t.id === action.payload.id ? action.payload : t));

    case 'DeleteTodo': 
      return save(todos.filter(t => t.id !== action.payload.id));

    case 'ToggleAll': 
      const activeCount = todos.filter(t => t.status === todoActive).length;
      const status = activeCount > 0 ? todoComplete : todoActive;  
      return save(todos.map(t => ({ ...t, status })));

    case 'ClearCompleted': 
      return save(todos.filter(t => t.status === todoActive));  
      
    default: return todos;      
  }
}

const newTodoReducer = (title: string = '', action: NewTodoAction): string => {
  switch(action.type) {
    case 'EnterNewTodo': 
      return action.payload;
    case 'ClearNewTodo': 
      return '';
    default: return title;
  }
}

const editingReducer = (editing: Todo | null = null, action: UpdateTodoAction): Todo | null => {
  switch(action.type) {
    case 'StartEditing': return action.payload;
    case 'UpdateEditing': return editing ? { ...editing, title: action.payload } : null;
    case 'FinishEditing': return null;
    case 'CancelEditing': return null;
    default: return editing;
  } 
}
 
export const reducer = combineReducers<Data, Action>({
  newTodo: newTodoReducer,
  nowEditing: editingReducer,
  todos: todosReducer
});
