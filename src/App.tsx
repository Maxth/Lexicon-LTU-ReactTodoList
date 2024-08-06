import {Outlet} from 'react-router-dom';
import './css/index.css';
import {Navbar} from './components';

import {ITodoContext} from './interfaces';
import {useTodo} from './hooks';

export function App() {
  const {todos, handleAddClick, toggleDone, deleteTodo} = useTodo();

  return (
    <main>
      <Navbar />
      <Outlet
        context={
          {
            todos,
            handleAddClick,
            toggleDone,
            deleteTodo,
          } satisfies ITodoContext
        }
      />
    </main>
  );
}
