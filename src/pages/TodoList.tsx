import {ReactElement} from 'react';
import {TodoItem} from '../components';
import {useTodoContext} from '../outletContext/useTodoContext';
import '../css/TodoList.css';

export function TodoList(): ReactElement {
  const {todos, toggleDone, deleteTodo} = useTodoContext();
  return (
    <section className='todo-list'>
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoItem
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
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
