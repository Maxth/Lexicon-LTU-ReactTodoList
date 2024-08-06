import {ISortOptions} from './interfaces';

export const placeholders = {
  todo: 'Add a new todo..',
  author: 'Enter your name',
};

export const sortOptions: ISortOptions[] = [
  {value: 'oldest', label: 'Oldest'},
  {value: 'newest', label: 'Newest'},
  {value: 'author', label: 'Author'},
];
