import React from 'react';
import { combineClassNames } from '../helpers/styling';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isBox?: boolean;
}

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  isBox?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isBox, ...rest } = props;

  const classNames = combineClassNames(
    isBox ? 'border p-2 rounded' : 'border-b-2',
    'border-gray-300 focus:border-blue-600',
    props.className ?? '',
  );

  return <input ref={ref} {...rest} className={classNames} />;
});

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { isBox, ...rest } = props;
    const classNames = combineClassNames(
      props.isBox ? 'border p-2 rounded' : 'border-b-2',
      'border-gray-300 focus:border-blue-600',
      props.className ?? '',
    );

    return <textarea ref={ref} {...rest} className={classNames}></textarea>;
  },
);

// const TextArea =

export default Input;
