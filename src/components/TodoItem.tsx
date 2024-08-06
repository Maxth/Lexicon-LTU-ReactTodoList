import React, {ReactElement, useRef, useState} from 'react';
import '../css/TodoItem.css';
import {ITodo} from '../interfaces';
import {useTodoContext} from '../outletContext/useTodoContext';

interface ITodoItemProps {
  todo: ITodo;
  deleteTodo: (id: string) => void;
  toggleDone: (id: string) => void;
}

export function TodoItem(props: ITodoItemProps): ReactElement {
  const {editTodo} = useTodoContext();
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const todoTextClasses =
    'todo-text-input' + (props.todo.isDone ? ' done' : '');

  const toggleEditing = async () => {
    setIsEditEnabled(!isEditEnabled);
    await new Promise(resolve => setTimeout(resolve, 10));
    inputRef.current?.focus();
  };

  const onInputKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      setIsEditEnabled(false);
    }
  };

  const onEdit: React.ChangeEventHandler<HTMLInputElement> = e => {
    editTodo(props.todo.id, e.target.value);
  };

  const onDoneClick = () => {
    setIsEditEnabled(false);
    inputRef.current?.blur();
    props.toggleDone(props.todo.id);
  };

  return (
    <article className='todo-item'>
      <div className='container'>
        <div onClick={onDoneClick} className='checkbox'>
          {props.todo.isDone ? (
            <span className='material-symbols-outlined'>check</span>
          ) : null}
        </div>
        <div className='container'>
          <input
            onChange={onEdit}
            onKeyUp={onInputKeyUp}
            ref={inputRef}
            disabled={!isEditEnabled}
            type='text'
            value={props.todo.todo}
            className={todoTextClasses}
          />
          <span
            onClick={toggleEditing}
            className={`material-symbols-outlined edit ${
              isEditEnabled ? 'underline' : ''
            }`}>
            edit
          </span>
        </div>
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
