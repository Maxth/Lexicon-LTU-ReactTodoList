import {ReactElement, useState} from 'react';
import {Input, AddBtn} from '../components';
import {placeholders} from '../data';
import {useTodoContext} from '../outletContext/useTodoContext';
import '../css/AddTodo.css';
import {useNavigate} from 'react-router-dom';

export function AddTodo(): ReactElement {
  const [todoInput, setTodoInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const {handleAddClick} = useTodoContext();
  const navigate = useNavigate();
  const onClick = () => {
    handleAddClick(todoInput, authorInput);
    setTodoInput('');
    setAuthorInput('');
    navigate('/list');
  };

  return (
    <section className='add-todo'>
      <h1>Add todos</h1>
      <div className='input-container'>
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
          onClick={onClick}
          disabled={todoInput === '' || authorInput === ''}
        />
      </div>
    </section>
  );
}
