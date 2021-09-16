import { combineClassNames } from '../../helpers/styling';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isBlock?: boolean;
  state?: 'normal' | 'danger';
}

export const LinkButton: React.FC<ButtonProps> = (props) => {
  let color = 'text-blue-600 hover:text-blue-800 focus:text-blue-800';
  if (props.state === 'danger') {
    color = 'text-red-600 hover:text-red-800 focus:text-red-800';
  }
  const className = combineClassNames('transition flex items-center', color);

  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};
