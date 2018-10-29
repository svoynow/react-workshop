import { List } from 'immutable';
import * as Actions from '../actions';
import { Data } from '../data';
import { todoActive, todoComplete } from '../interfaces';
import { reducer } from '../reducer';
import { makeTodo, Todo, todoFactory } from '../todo';

const initialTodos: List<Todo> = List([
  {
    id: '1',
    status: todoActive,
    title: 'Go Shopping',
  },
  {
    id: '2',
    status: todoComplete,
    title: 'Pay Visa'
  }
].map(todoFactory));

const initialState = {  
  newTodo: '',
  nowEditing: null,
  todos: initialTodos,
}

describe('TodosAction', () => {

  test('LoadTodos sets the todos in the state', () => {
    const state: Data = { ...initialState, todos: List([]) };
    const newState = reducer(state, Actions.loadTodosAction(initialTodos));
    expect(newState).toEqual({ ...state, todos: initialTodos })
  });

  test('CreateTodo adds a todo to the state', () => {
    const newTodo = makeTodo('Change the oil');
    const newState = reducer(initialState, Actions.createTodoAction(newTodo));
    expect(newState).toEqual({ ...initialState, todos: initialState.todos.push(newTodo) })
  });

  test('EditTodo modifies an existing todo', () => {
    const editedTodo = { ...initialTodos[0], status: todoComplete };
    const newState = reducer(initialState, Actions.editTodoAction(editedTodo));
    expect(newState).toEqual({ ...initialState, todos: initialTodos.set(0, editedTodo) })
  });
});
