import { combineClassNames } from '../../helpers/styling';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  level: 'primary';
  isBlock?: boolean;
}

const ButtonColorStyles = {
  primary: 'p-2 bg-blue-600 rounded text-white',
};

export const Button: React.FC<ButtonProps> = (props) => {
  const className = combineClassNames(
    ButtonColorStyles[props.level],
    props.isBlock ? 'w-100' : '',
  );
  return <button className={className}>{props.children}</button>;
};
