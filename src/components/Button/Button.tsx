import { combineClassNames } from '../../helpers/styling';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  level: 'primary' | 'danger' | 'classic';
  isBlock?: boolean;
}

const ButtonColorStyles = {
  primary:
    'px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition',
  danger:
    'px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 transition',
  classic:
    'px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 transition',
};

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { level, isBlock, className, ...rest } = props;

  const newClassName = combineClassNames(
    ButtonColorStyles[level],
    isBlock ? 'w-full' : '',
    className ?? '',
  );

  return (
    <button className={newClassName} {...rest}>
      {props.children}
    </button>
  );
};
