import React, {Dispatch, ReactElement, SetStateAction} from 'react';
import '../css/Input.css';

interface IInputProps {
  value: string;
  placeholder: string;
  setInput: Dispatch<SetStateAction<string>>;
  //   refHandle: React.LegacyRef<HTMLInputElement>;
}

export function Input(props: IInputProps): ReactElement {
  return (
    <input
      //   ref={props.refHandle}
      onChange={e => props.setInput(e.target.value)}
      value={props.value}
      className='input'
      type='text'
      placeholder={props.placeholder}
    />
  );
}
