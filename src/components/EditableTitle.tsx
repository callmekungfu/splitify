import { useEffect, useRef, useState } from 'react';
import Input from './Input';

const TitleLevelStyles = {
  h1: 'text-5xl font-bold',
  h2: 'text-4xl font-bold',
  h3: 'text-3xl font-bold',
  h4: 'text-2xl font-bold',
  h5: 'text-xl',
};

const EditButtonStyles = {
  h1: 'h-8 w-8',
  h2: 'h-7 w-7',
  h3: 'h-6 w-6',
  h4: 'h-5 w-5',
  h5: 'h-4 w-4',
};

interface EditableTitleProps {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  onChange: (value: string) => any;
  defaultValue?: string;
  className?: string;
}

const EditButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const SaveButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);

const EditableTitle: React.FC<EditableTitleProps> = ({
  defaultValue,
  level,
  className,
}) => {
  const [title, setTitle] = useState(defaultValue ?? '');
  const [enableEdit, setEnableEdit] = useState(false);

  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl?.current) {
      inputEl.current.focus();
    }
  }, [enableEdit]);

  const toggleEdit = () => setEnableEdit(!enableEdit);

  return (
    <h1 className={TitleLevelStyles[level] + ` ${className}`}>
      <span className="mr-4">
        {enableEdit ? (
          <Input
            value={title}
            type="text"
            ref={inputEl}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        ) : (
          title
        )}
      </span>
      <button
        className={
          EditButtonStyles[level] +
          ' text-blue-600 hover:text-blue-800 focus:text-blue-800'
        }
        onClick={toggleEdit}
      >
        {enableEdit ? <SaveButton /> : <EditButton />}
      </button>
    </h1>
  );
};

export default EditableTitle;
