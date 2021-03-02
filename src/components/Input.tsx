import React from 'react';
import { combineClassNames } from '../helpers/styling';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isBox?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const classNames = combineClassNames(
    props.isBox ? 'border p-2 rounded' : 'border-b-2',
    'border-gray-300 focus:border-blue-600',
    props.className ?? '',
  );
  return <input ref={ref} {...props} className={classNames} />;
});

// const TextArea =

export default Input;
