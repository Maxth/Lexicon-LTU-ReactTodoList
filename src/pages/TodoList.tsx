import {ReactElement} from 'react';
import {TodoItem} from '../components';
import {useTodoContext} from '../outletContext/useTodoContext';
import '../css/TodoList.css';
import {sortOptions} from '../data';
import Select from 'react-select';
import {TSortOptions} from '../types';

export function TodoList(): ReactElement {
  const {todos, sortTodos} = useTodoContext();
  return (
    <section className='todo-list'>
      <div className='todos'>
        {todos.length > 0 ? (
          todos.map(todo => <TodoItem todo={todo} key={todo.id} />)
        ) : (
          <h2>Your todos will appear here:)</h2>
        )}
      </div>

      <Select
        onChange={e => sortTodos(e?.value as TSortOptions)}
        className='select'
        placeholder='Sort..'
        options={sortOptions}
      />
    </section>
  );
}
