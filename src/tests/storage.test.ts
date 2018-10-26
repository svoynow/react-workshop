import { makeTodo } from '../data';
import { load, save } from '../storage';

beforeEach(() => localStorage.clear());

it('should save to localStorage with the correct key', () => {
  const todo = makeTodo('test');
  save([todo]);
  expect(localStorage.setItem).toHaveBeenLastCalledWith('typescript-todo-mvc', JSON.stringify([todo]));
});

it('should load and deserialize from localStorage', () => {
  const todo = makeTodo('test');
  save([todo]);
  const todos = load();
  expect(todos).toEqual([todo])
});

it('returns an empty array when no data has been stored', () => {
  expect(load()).toEqual([]);
});