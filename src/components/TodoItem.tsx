import React, {ReactElement, useRef, useState} from 'react';
import '../css/TodoItem.css';
import {ITodo} from '../interfaces';
import {useTodoContext} from '../outletContext/useTodoContext';

interface ITodoItemProps {
  todo: ITodo;
}

export function TodoItem({todo}: ITodoItemProps): ReactElement {
  const {editTodo, deleteTodo, toggleDone, moveTodo} = useTodoContext();
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const todoTextClasses = 'todo-text-input' + (todo.isDone ? ' done' : '');

  const toggleEditing = () => {
    setIsEditEnabled(!isEditEnabled);
  };

  const onInputKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      setIsEditEnabled(false);
    }
  };

  const onEdit: React.ChangeEventHandler<HTMLInputElement> = e => {
    editTodo(todo.id, e.target.value);
  };

  const onDoneClick = () => {
    setIsEditEnabled(false);
    inputRef.current?.blur();
    toggleDone(todo.id);
  };

  return (
    <article className='todo-item'>
      <div className='container'>
        <div onClick={onDoneClick} className='checkbox'>
          {todo.isDone ? (
            <span className='material-symbols-outlined'>check</span>
          ) : null}
        </div>
        <div className='container'>
          {isEditEnabled ? (
            <input
              onChange={onEdit}
              onKeyUp={onInputKeyUp}
              ref={inputRef}
              autoFocus
              type='text'
              value={todo.todo}
              className={todoTextClasses}
            />
          ) : (
            <p className={todoTextClasses}>{todo.todo}</p>
          )}
          <span
            onClick={toggleEditing}
            className={`material-symbols-outlined edit ${
              isEditEnabled ? 'underline' : ''
            }`}>
            edit
          </span>
        </div>
      </div>
      <div className='vertical'>
        <span
          onClick={() => moveTodo(todo.id, 'up')}
          className='material-symbols-outlined arrow'>
          keyboard_arrow_up
        </span>
        <span
          onClick={() => moveTodo(todo.id, 'down')}
          className='material-symbols-outlined arrow'>
          keyboard_arrow_down
        </span>
      </div>
      <div className='container'>
        <div>
          <p className='author-text'>Author: {todo.author}</p>
          <p className='date-text'>
            {`Created: ${todo.timestamp.toLocaleDateString()} ${todo.timestamp.toLocaleTimeString()}`}
          </p>
        </div>
        <span
          onClick={() => deleteTodo(todo.id)}
          className='material-symbols-outlined trashcan'>
          delete
        </span>
      </div>
    </article>
  );
}
