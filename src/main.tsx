import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.tsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './css/index.css';
import {About} from './pages/About.tsx';
import {AddTodo} from './pages/AddTodo.tsx';
import {TodoList} from './pages/TodoList.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <About />},
      {path: 'add', element: <AddTodo />},
      {path: 'list', element: <TodoList />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
