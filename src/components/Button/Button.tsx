import { combineClassNames } from '../../helpers/styling';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  level: 'primary';
  isBlock?: boolean;
}

const ButtonColorStyles = {
  primary:
    'p-2 bg-blue-600 rounded text-white hover:bg-blue-800 focus:bg-blue-800 transition',
};

export const Button: React.FC<ButtonProps> = (props) => {
  const className = combineClassNames(
    ButtonColorStyles[props.level],
    props.isBlock ? 'w-full' : '',
  );
  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};
