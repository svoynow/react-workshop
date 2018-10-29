import { List } from 'immutable'
import { load, save } from '../storage';
import { makeTodo } from '../todo';

beforeEach(() => localStorage.clear());

it('should save to localStorage with the correct key', () => {
  const todo = makeTodo('test');
  save(List([todo]));
  expect(localStorage.setItem).toHaveBeenLastCalledWith('typescript-todo-mvc', JSON.stringify([todo]));
});

it('should load and deserialize from localStorage', () => {
  const todo = makeTodo('test');
  save(List([todo]));
  const todos = load();
  expect(todos.toJSON).toEqual(List([todo]).toJSON);
});

it('returns an empty array when no data has been stored', () => {
  expect(load()).toEqual([]);
});