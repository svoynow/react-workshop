import { Action } from './actions';
import { 
  addTodo,
  clearCompleted,
  Data,
  removeTodo,
  toggleAll,
  updateTodo
 } from './data';

export const reducer = (data: Data, action: Action): Data => {
  switch(action.type) {
    case 'LoadTodos': return action.payload
    case 'CreateTodo': return addTodo(data, action.payload)
    case 'EditTodo': return updateTodo(data, action.payload)
    case 'DeleteTodo': return removeTodo(data, action.payload)
    case 'ToggleAll': return toggleAll(data)
    case 'ClearCompleted': return clearCompleted(data);
    case 'EnterNewTodo': return { ...data, newTodo: action.payload }
  }
  return data;
}