import {useState} from 'react';
import {ITodo, ITodoContext} from '../interfaces';

const sort = (t1: ITodo, t2: ITodo): number => {
  if (!t1.isDone && !t2.isDone) {
    return t1.timestamp.getTime() - t2.timestamp.getTime();
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
      ].sort(sort)
    );
  };

  const deleteTodo = (id: string) => setTodos(todos.filter(t => t.id !== id));

  const toggleDone = (id: string) =>
    setTodos(prev => [
      ...prev
        .map(t => (t.id === id ? {...t, isDone: !t.isDone} : t))
        .sort(sort),
    ]);

  const editTodo = (id: string, value: string) =>
    setTodos(prev => prev.map(t => (t.id === id ? {...t, todo: value} : t)));

  return {todos, deleteTodo, handleAddClick, toggleDone, editTodo};
};
