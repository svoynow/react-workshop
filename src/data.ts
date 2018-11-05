import uuidv4 from 'uuid/v4';
import { Todo, todoActive } from './interfaces';

let nextOrder = 0;

export const makeTodo = (title: string): Todo => (
  {
    id: uuidv4(),
    order: nextOrder++,
    status: todoActive,
    title
  }
);