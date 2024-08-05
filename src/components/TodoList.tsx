import React, {ReactElement} from 'react';
import {ITodo} from '../interfaces';
import '../css/TodoList.css';
import {TodoItem} from '.';

interface ITodoListProps {
  todos: ITodo[];
  deleteTodo: (id: string) => void;
  toggleDone: (id: string) => void;
}

export function TodoList(props: ITodoListProps): ReactElement {
  return (
    <section className='todo-list'>
      {props.todos.length > 0 ? (
        props.todos.map(todo => (
          <TodoItem
            toggleDone={props.toggleDone}
            deleteTodo={props.deleteTodo}
            todo={todo}
            key={todo.id}
          />
        ))
      ) : (
        <h2>Your todos will appear here:)</h2>
      )}
    </section>
  );
}
