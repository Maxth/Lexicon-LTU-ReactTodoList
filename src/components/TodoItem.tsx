import React, {ReactElement} from 'react';
import '../css/TodoItem.css';
import {ITodo} from '../interfaces';

interface ITodoItemProps {
  todo: ITodo;
  deleteTodo: (id: string) => void;
  toggleDone: (id: string) => void;
}

export function TodoItem(props: ITodoItemProps): ReactElement {
  const todoTextClasses = 'todo-text' + (props.todo.isDone ? ' done' : '');

  return (
    <article className='todo-item'>
      <div className='container'>
        <div
          onClick={() => props.toggleDone(props.todo.id)}
          className='checkbox'>
          {props.todo.isDone ? (
            <span className='material-symbols-outlined'>check</span>
          ) : null}
        </div>
        <p className={todoTextClasses}>{props.todo.todo}</p>
      </div>
      <div className='container'>
        <div>
          <p className='author-text'>Author: {props.todo.author}</p>
          <p className='date-text'>
            {`Created: ${props.todo.timestamp.toLocaleDateString()} ${props.todo.timestamp.toLocaleTimeString()}`}
          </p>
        </div>
        <span
          onClick={() => props.deleteTodo(props.todo.id)}
          className='material-symbols-outlined trashcan'>
          delete
        </span>
      </div>
    </article>
  );
}
