import * as Api from '../api';
import { showAll, Todo, todoActive, todoCompleted } from '../interfaces';
import { 
  clearCompleted, 
  createTodo, 
  createTodoSuccess, 
  deleteTodo, 
  deleteTodoSuccess, 
  fetchTodos,
  loadTodosSuccess,
  toggleAll,
  updateTodo,
  updateTodoSuccess,
} from '../newActions';

// tslint:disable no-console
jest.mock('../api');

const mockTodo = {
  id: '4',
  order: 1,
  status: todoActive,
  title: 'Hello'
};

describe('success', () => {
  beforeAll(() => {
    (Api.getTodo as any).mockImplementation(() => Promise.resolve(mockTodo));
    (Api.createTodo as any).mockImplementation((t: Todo) => Promise.resolve(t));
    (Api.deleteTodo as any).mockImplementation(() => Promise.resolve({}));
    (Api.updateTodo as any).mockImplementation((t: Todo) => Promise.resolve(t));
    (Api.getAllTodos as any).mockImplementation(() => Promise.resolve([mockTodo]));    
  });

  test('fetchTodos dispatches success action on success', async () => {
    const dispatch = jest.fn();
    await fetchTodos()(dispatch);
    expect(dispatch.mock.calls.length).toBe(1); 
    expect(dispatch.mock.calls[0][0]).toEqual(loadTodosSuccess([mockTodo])) 
  });
  
  test('createTodo dispatches success on success', async () => {
    const dispatch = jest.fn();
    await createTodo(mockTodo)(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual(createTodoSuccess(mockTodo));
  });

  test('deleteTodo dispatches success action on success', async () => {
    const dispatch = jest.fn();
    await deleteTodo(mockTodo)(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual(deleteTodoSuccess(mockTodo));
  });

  test('updateTodo dispatches success action on success', async () => {
    const dispatch = jest.fn();
    await updateTodo(mockTodo)(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual(updateTodoSuccess(mockTodo));
  });

  test('toggleAll dispatches updateTodoSuccess for all todos it is passed', async () => {
    const dispatch = jest.fn();
    await toggleAll([mockTodo, mockTodo, mockTodo], todoActive)(dispatch);
    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0]).toEqual(updateTodoSuccess(mockTodo));
    expect(dispatch.mock.calls[1][0]).toEqual(updateTodoSuccess(mockTodo));
    expect(dispatch.mock.calls[2][0]).toEqual(updateTodoSuccess(mockTodo));
  });

  test('clearCompleted dispatches deleteTodoSuccess for all completed todos it is passed', async() => {
    const dispatch = jest.fn();
    const completedTodo = { ...mockTodo, status: todoCompleted }
    const mockState = jest.fn(() => ({ data: [completedTodo, completedTodo, mockTodo, completedTodo] }));
    await clearCompleted(showAll)(dispatch, mockState);
    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0]).toEqual(deleteTodoSuccess(completedTodo));
    expect(dispatch.mock.calls[1][0]).toEqual(deleteTodoSuccess(completedTodo));
    expect(dispatch.mock.calls[2][0]).toEqual(deleteTodoSuccess(completedTodo));    
  });

  test('clearCompleted does nothing when we are only viewing active', async() => {
    const dispatch = jest.fn();
    const completedTodo = { ...mockTodo, status: todoCompleted }
    const mockState = jest.fn(() => ({ data: [completedTodo, completedTodo, mockTodo, completedTodo] }));
    await clearCompleted(todoActive)(dispatch, mockState);
    expect(dispatch.mock.calls.length).toBe(0);   
  });  
});
  
describe('failure', () => {
  beforeAll(() => {
    (Api.getTodo as any).mockImplementation(() => Promise.reject('bad news'));
    (Api.createTodo as any).mockImplementation((t: Todo) => Promise.reject('nope'));
    (Api.deleteTodo as any).mockImplementation(() => Promise.reject('cant do it'));
    (Api.updateTodo as any).mockImplementation((t: Todo) => Promise.reject('failure'));
    (Api.getAllTodos as any).mockImplementation(() => Promise.reject('disaster'));    
  });  
});