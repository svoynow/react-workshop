import axios, { AxiosResponse } from 'axios';
import { NewTodo, Todo, todoActive, todoCompleted } from './interfaces';

const baseURL = 'http://localhost:4000/api';

const client = axios.create({ baseURL });

interface ServerTodoBody {
  order: number,
  title: string,
  completed: boolean
}

interface ServerTodo extends ServerTodoBody {
  id: number,
};

interface ServerTodoResponse {
  data: ServerTodo
};

interface ServerTodosResponse {
  data: ServerTodo[]
};

const convertServerTodo = (st: ServerTodo): Todo => {
  return {
    ...st,
    id: `${st.id}`,
    status: st.completed ? todoCompleted : todoActive
  }
}

const convertTodo = (todo: NewTodo | Todo): ServerTodoBody => (
  {
    ...todo,
    completed: todo.status.kind === 'Completed'
  }
)

const handleTodoResponse = ({ data: payload }: AxiosResponse<ServerTodoResponse>): Todo => 
  convertServerTodo(payload.data);

const handleTodosResponse = ({ data: payload }: AxiosResponse<ServerTodosResponse>): Todo[] => 
  payload.data.map(convertServerTodo);

export const getAllTodos = (): Promise<Todo[]> => 
  client.get<ServerTodosResponse>('todos')
    .then(handleTodosResponse);

export const getTodo = (id: number): Promise<Todo> => 
  client.get<ServerTodoResponse>(`todos/${id}`)
    .then(handleTodoResponse)

export const createTodo = (todo: NewTodo): Promise<Todo> => 
  client.post<ServerTodoResponse>('todos', { todo: convertTodo(todo) })
    .then(handleTodoResponse)

export const updateTodo = (todo: Todo): Promise<Todo> => 
  client.put<ServerTodoResponse>(`todos/${todo.id}`, { todo: convertTodo(todo) })
    .then(handleTodoResponse)

export const deleteTodo = (todo: Todo): Promise<any> => 
  client.delete(`todos/${todo.id}`)