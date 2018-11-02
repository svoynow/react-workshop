import uuidv4 from 'uuid/v4';
import { NowShowing, Todo, todoActive } from './interfaces';

let nextOrder = 0;

export const makeTodo = (title: string, order?: number): Todo => (
  {
    id: uuidv4(),
    order: order || nextOrder++,
    status: todoActive,
    title
  }
);

export const filterTodos = (todos: Todo[], nowShowing: NowShowing): Todo[] =>
  nowShowing.kind === 'ShowAll' ? todos : todos.filter(t => t.status.kind === nowShowing.kind);