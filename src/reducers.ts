import { Action } from './actions'
import { makeTodo } from './data';
import { State, Todo, todoActive, todoCompleted } from './interfaces';
import { loadTodos, saveTodos } from './storage';

export const addTodo = (todos: Todo[], title: string): Todo[] => {
  const result = [...todos, makeTodo(title)];
  saveTodos(result);
  return result;
}

export const deleteTodo = (todos: Todo[], todo: Todo): Todo[] => {
  const result = todos.filter(t => t.id !== todo.id);
  saveTodos(result);
  return result;
}

export const updateTodo = (todos: Todo[], todo: Todo): Todo[] => {
  const result = todos.map(t => t.id === todo.id ? todo : t);
  saveTodos(result);
  return result;
}

export const toggleAll = (todos: Todo[]): Todo[] => {
  const activeCount = todos.filter(t => t.status.kind === todoActive.kind).length;
  const newStatus = activeCount > 0 ? todoCompleted : todoActive
  const result = todos.map(t => ({ ...t, status: newStatus }));
  saveTodos(result);
  return result;
};

export const deleteCompleted = (todos: Todo[]): Todo[] => {
  const result = todos.filter(t => t.status.kind === todoActive.kind);
  saveTodos(result);
  return result;
}

export const processAction = (state: State = { data: [] }, action: Action): State => {
  switch(action.type) {
    case 'AddTodo': 
      return { data: addTodo(state.data, action.payload.title)} 
    case 'DeleteTodo': 
      return { data: deleteTodo(state.data, action.payload)}
    case 'FetchTodos': 
      return { data: loadTodos() }
    case 'UpdateTodo': 
      return { data: updateTodo(state.data, action.payload)}
    case 'ToggleAll': 
      return { data: toggleAll(state.data) }
    case 'ClearCompleted': 
      return { data: deleteCompleted(state.data) }
  };
  return state;
}