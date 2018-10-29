import { Record, RecordOf } from 'immutable';
import uuidv4 from 'uuid/v4'
import { todoActive, TodoStatus } from './interfaces';

export interface TodoProps {
  id: string,
  title: string,
  status: TodoStatus
};

export type Todo = RecordOf<TodoProps>

export const todoFactory: Record.Factory<TodoProps> = Record({
  id: uuidv4(),
  status: todoActive,
  title: '',
});

export const makeTodo = (title: string) => todoFactory({ id: uuidv4(), title });