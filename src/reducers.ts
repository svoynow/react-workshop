import { makeTodo } from './data';
import { State, Todo, todoActive, todoCompleted } from './interfaces';
import { Action } from './newActions'

export const addTodo = (todos: Todo[], title: string): Todo[] => {
  const result = [...todos, makeTodo(title)];
  return result;
}

export const deleteTodo = (todos: Todo[], todo: Todo): Todo[] => {
  const result = todos.filter(t => t.id !== todo.id);
  return result;
}

export const updateTodo = (todos: Todo[], todo: Todo): Todo[] => {
  const result = todos.map(t => t.id === todo.id ? todo : t);
  return result;
}

export const toggleAll = (todos: Todo[]): Todo[] => {
  const activeCount = todos.filter(t => t.status.kind === todoActive.kind).length;
  const newStatus = activeCount > 0 ? todoCompleted : todoActive
  const result = todos.map(t => ({ ...t, status: newStatus }));
  return result;
};

export const deleteCompleted = (todos: Todo[]): Todo[] => {
  const result = todos.filter(t => t.status.kind === todoActive.kind);
  return result;
}

export const processAction = (state: State = { data: [] }, action: Action): State => {
  switch(action.type) {
    case 'CreateTodoSuccess': 
      return { data: addTodo(state.data, action.payload.title)} 
    case 'DeleteTodoSuccess': 
      return { data: deleteTodo(state.data, action.payload)}
    case 'LoadTodosSuccess': 
      return { data: action.payload }
    case 'EditTodoSuccess': 
      return { data: updateTodo(state.data, action.payload)}
  };
  return state;
}