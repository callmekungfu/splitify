import { combineClassNames } from '../../helpers/styling';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isBlock?: boolean;
}

export const LinkButton: React.FC<ButtonProps> = (props) => {
  const className = combineClassNames(
    'transition text-blue-600 hover:text-blue-800 focus:text-blue-800 flex items-center',
  );
  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};
