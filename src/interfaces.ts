export interface NewTodo {
  order: number
  status: Status,
  title: string
}

export interface Todo extends NewTodo {
  id: string,
};

interface Active {
  kind: 'Active'
}
export const todoActive: Active = ({ kind: 'Active' });

interface Completed {
  kind: 'Completed'
}
export const todoCompleted: Completed = ({ kind: 'Completed' });

export type Status = Completed | Active;

export const flipStatus = (status: Status): Status => {
  switch(status.kind) {
    case('Completed'): return todoActive;    
    case('Active'): return todoCompleted;
  }
};

export const showAll = ({ kind: 'ShowAll' });
export type ShowAll = typeof showAll;

export type NowShowing = Status | ShowAll;

export interface State {
  data: Todo[]
};