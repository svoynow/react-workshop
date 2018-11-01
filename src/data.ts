import uuidv4 from 'uuid/v4';
import { Todo, todoActive } from './interfaces';

export const makeTodo = (title: string): Todo => (
  {
    id: uuidv4(),
    status: todoActive,
    title
  }
);