import {useEffect, useState} from 'react';
import {ITodo, ITodoContext} from '../interfaces';
import {TSortOptions} from '../types';

const defaultSort = (t1: ITodo, t2: ITodo): number => {
  if (!t1.isDone && !t2.isDone) {
    return 0;
  }
  if (t1.isDone && !t2.isDone) {
    return 1;
  }
  return -1;
};

export const useTodo = (): ITodoContext => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleAddClick = async (todo: string, author: string) => {
    const res = await fetch(`https://localhost:7047/api/TodoItems`, {
      method: 'POST',
      headers: {accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({todo, author, isDone: false}),
    });
    const data = await res.json();
    if (res.ok) {
      setTodos(prev =>
        [
          ...prev,
          {
            todo,
            author,
            id: data.id,
            timestamp: new Date(data.timestamp),
            isDone: false,
          },
        ].sort(defaultSort)
      );
    } else {
      console.error(data);
    }
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`https://localhost:7047/api/TodoItems/${id}`, {
      method: 'DELETE',
      headers: {accept: 'application/json'},
    });
    if (res.ok) {
      setTodos(todos.filter(t => t.id !== id));
    } else {
      const data = await res.json();
      console.error(data);
    }
  };

  const toggleDone = async (id: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);

    if (todoToUpdate === undefined) {
      throw new Error('Failed to find Todo in toggleDone function');
    }

    const res = await fetch(`https://localhost:7047/api/TodoItems/${id}`, {
      method: 'PUT',
      headers: {accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...todoToUpdate,
        //FIXME Fix a patch endpoint instead and fix timestamp relation between .NET server and TS client
        timestamp: todoToUpdate.timestamp.toISOString(),
        isDone: !todoToUpdate.isDone,
      }),
    });
    if (res.ok) {
      setTodos(prev => [
        ...prev
          .map(t => (t.id === id ? {...t, isDone: !t.isDone} : t))
          .sort(defaultSort),
      ]);
    } else {
      const data = await res.json();
      console.error(data);
    }
  };

  const editTodo = async (id: string, value: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate === undefined) {
      throw new Error('Failed to find Todo in toggleDone function');
    }
    const res = await fetch(`https://localhost:7047/api/TodoItems/${id}`, {
      method: 'PUT',
      headers: {accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...todoToUpdate,
        //FIXME Fix a patch endpoint instead and fix timestamp relation between .NET server and TS client
        timestamp: todoToUpdate.timestamp.toISOString(),
        todo: value,
      }),
    });
    if (res.ok) {
      setTodos(prev => prev.map(t => (t.id === id ? {...t, todo: value} : t)));
    } else {
      const data = await res.json();
      console.error(data);
    }
  };

  const moveTodo = (id: string, direction: 'up' | 'down') => {
    const oldIndex = todos.findIndex(t => t.id === id);
    const newIndex =
      direction === 'up'
        ? Math.max(0, oldIndex - 1)
        : Math.min(todos.length, oldIndex + 1);
    setTodos(prev => {
      const tempTodoArr = [...prev];
      const todoToMove = tempTodoArr.splice(oldIndex, 1);
      tempTodoArr.splice(newIndex, 0, ...todoToMove);
      return tempTodoArr;
    });
  };

  const sortTodos = (value: TSortOptions) => {
    switch (value) {
      case 'oldest':
        setTodos(prev => [
          ...prev.sort(
            (t1, t2) => t1.timestamp.getTime() - t2.timestamp.getTime()
          ),
        ]);
        break;
      case 'newest':
        setTodos(prev => [
          ...prev.sort(
            (t1, t2) => t2.timestamp.getTime() - t1.timestamp.getTime()
          ),
        ]);
        break;
      case 'author':
        setTodos(prev => [
          ...prev.sort((t1, t2) => t1.author.localeCompare(t2.author)),
        ]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://localhost:7047/api/TodoItems', {
        headers: {accept: 'application/json'},
      });
      const data = await res.json();
      return data.map((obj: ITodo) => ({
        ...obj,
        timestamp: new Date(obj.timestamp),
      }));
    };
    fetchTodos().then(data => setTodos(data));
  }, []);

  return {
    todos,
    deleteTodo,
    handleAddClick,
    toggleDone,
    editTodo,
    moveTodo,
    sortTodos,
  };
};
