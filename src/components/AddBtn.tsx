import {ReactElement} from 'react';
import '../css/AddBtn.css';

interface IAddBtnProps {
  disabled: boolean;
  onClick: () => void;
}

export function AddBtn(props: IAddBtnProps): ReactElement {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className='add-btn'>
      Add
    </button>
  );
}
