import React from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className="border-b-2 border-gray-600 focus:border-blue-600"
  />
));

export default Input;
