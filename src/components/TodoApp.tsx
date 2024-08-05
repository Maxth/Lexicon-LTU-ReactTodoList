import React, {ReactElement, useState} from 'react';
import '../css/TodoApp.css';
import {AddBtn, Input, TodoList} from '.';
import {placeholders} from '../data';
import {ITodo} from '../interfaces';

export function TodoApp(): ReactElement {
  const [todoInput, setTodoInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');

  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleAddClick = () => {
    setTodos(prev => [
      ...prev,
      {
        todo: todoInput,
        author: authorInput,
        id: Date.now().toString(),
        timestamp: new Date(),
        isDone: false,
      },
    ]);

    setTodoInput('');
    setAuthorInput('');
  };

  const deleteTodo = (id: string) => setTodos(todos.filter(t => t.id !== id));

  const toggleDone = (id: string) =>
    setTodos(prev => [
      ...prev
        .map(t => (t.id === id ? {...t, isDone: !t.isDone} : t))
        .sort((t1, t2) => {
          if (!t1.isDone && !t2.isDone) {
            return t1.timestamp.getTime() - t2.timestamp.getTime();
          }
          if (t1.isDone && !t2.isDone) {
            return 1;
          }
          return -1;
        }),
    ]);

  return (
    <section className='todo-app'>
      <h1>Todo List</h1>
      <section className='input-container'>
        <Input
          value={todoInput}
          setInput={setTodoInput}
          placeholder={placeholders.todo}
        />
        <Input
          value={authorInput}
          setInput={setAuthorInput}
          placeholder={placeholders.author}
        />
        <AddBtn
          onClick={handleAddClick}
          disabled={todoInput === '' || authorInput === ''}
        />
      </section>
      <TodoList toggleDone={toggleDone} todos={todos} deleteTodo={deleteTodo} />
    </section>
  );
}
