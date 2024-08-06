import {ReactElement} from 'react';
import '../css/About.css';
import {useTodoContext} from '../outletContext/useTodoContext';

export function About(): ReactElement {
  const {todos} = useTodoContext();

  return (
    <section className='about'>
      <h3>
        Take advantage of this todo app to help you remember what you have to
        do:)
      </h3>
      <p>
        There are currently {todos.length} todos in the list of which{' '}
        {todos.filter(t => !t.isDone).length} have not been completed.
      </p>
    </section>
  );
}
