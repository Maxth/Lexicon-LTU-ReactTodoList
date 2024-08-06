import {ReactElement} from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';

export function Navbar(): ReactElement {
  return (
    <nav className='navbar'>
      <Link className='link' to=''>
        About
      </Link>
      <Link className='link' to='add'>
        Add todos
      </Link>
      <Link className='link' to='list'>
        List todos
      </Link>
    </nav>
  );
}
