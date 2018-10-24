
interface TodoActive {
  type: 'TodoActive'
};

export const todoActive: TodoActive = { type: 'TodoActive' }

interface TodoComplete {
  type: 'TodoComplete'
};

export const todoComplete: TodoComplete = { type: 'TodoComplete' }

export type TodoStatus = TodoActive | TodoComplete;

export interface Todo {
  id: string,
  title: string,
  status: TodoStatus
};

interface ShowAll {
  type: 'ShowAll'
};

export const showAll: ShowAll = { type: 'ShowAll' };

export type NowShowing = TodoStatus | ShowAll;