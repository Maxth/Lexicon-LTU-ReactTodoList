import {TSortOptions} from './types';

export interface ITodo {
  id: string;
  todo: string;
  author: string;
  timestamp: Date;
  isDone: boolean;
}

export interface ITodoContext {
  todos: ITodo[];
  deleteTodo: (id: string) => void;
  handleAddClick: (todo: string, author: string) => void;
  toggleDone: (id: string) => void;
  editTodo: (id: string, value: string) => void;
  moveTodo: (id: string, direction: 'up' | 'down') => void;
  sortTodos: (value?: TSortOptions) => void;
}

export interface ISortOptions {
  value: string;
  label: string;
}
