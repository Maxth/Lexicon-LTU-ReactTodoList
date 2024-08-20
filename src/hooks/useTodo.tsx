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

  const handleAddClick = (todo: string, author: string) => {
    setTodos(prev =>
      [
        ...prev,
        {
          todo,
          author,
          id: Date.now().toString(),
          timestamp: new Date(),
          isDone: false,
        },
      ].sort(defaultSort)
    );
  };

  const deleteTodo = (id: string) => setTodos(todos.filter(t => t.id !== id));

  const toggleDone = (id: string) =>
    setTodos(prev => [
      ...prev
        .map(t => (t.id === id ? {...t, isDone: !t.isDone} : t))
        .sort(defaultSort),
    ]);

  const editTodo = (id: string, value: string) =>
    setTodos(prev => prev.map(t => (t.id === id ? {...t, todo: value} : t)));

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
