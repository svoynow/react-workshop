export interface Todo {
  id: string,
  status: Status,
  title: string
};

export const todoActive = ({ kind: 'Active' });
export type Active = typeof todoActive

export const todoCompleted = ({ kind: 'Completed' });
export type Completed = typeof todoCompleted

export type Status = Completed | Active;

export const flipStatus = (status: Status): Status => {
  switch(status.kind) {
    case('Completed'): return todoActive;    
    case('Active'): return todoCompleted;
  }
  return status;
};

export const showAll = ({ kind: 'ShowAll' });
export type ShowAll = typeof showAll;

export type NowShowing = Status | ShowAll;

export interface State {
  data: Todo[]
};