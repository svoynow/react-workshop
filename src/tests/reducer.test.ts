

import { todoActive, todoCompleted } from '../interfaces';
import { 
  createTodoSuccess, 
  deleteTodoSuccess,
  loadTodosSuccess,
  updateTodoSuccess,
} from '../newActions';
import { processAction } from '../reducers'

const mockTodo = {
  id: '1',
  order: 1,
  status: todoActive,
  title: 'Hello'
};

describe('CreateTodoSuccess', () => {
  test('it adds the new todo to the state', () => {
    expect(processAction({ data: [] }, createTodoSuccess(mockTodo)).data[0]).toBe(mockTodo);
  });
});

describe('UpdateTodoSuccess', () => {
  test('it updates the title', () => {
    const updatedTodo = {...mockTodo, title: 'New Title'};
    expect(processAction({ data: [mockTodo] }, updateTodoSuccess(updatedTodo)).data[0])
      .toEqual({ ...mockTodo, title: 'New Title' });
  });

  test('it updates the status', () => {
    const updatedTodo = {...mockTodo, status: todoCompleted};
    expect(processAction({ data: [mockTodo] }, updateTodoSuccess(updatedTodo)).data[0])
      .toEqual({ ...mockTodo, status: todoCompleted});
  });
});

describe('DeleteTodoSuccess', () => {  
  test('it deletes the passed Todo', () => {
    expect(processAction({ data: [mockTodo] }, deleteTodoSuccess(mockTodo))).toEqual({ data: [] });
  });  
});

describe('LoadTodosSuccess', () => {
  test('it sets the state to the loaded todos', () => {
    expect(processAction({ data: [] }, loadTodosSuccess([mockTodo]))).toEqual({ data: [mockTodo] });
  });
});
