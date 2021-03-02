import { useEffect, useRef, useState } from 'react';
import { getInitialFromName } from '../helpers/participantHelper';
import { combineClassNames } from '../helpers/styling';
import { Button } from './Button/Button';
import { UserIcon } from './Icons';
import Input from './Input';

interface BillActorProps {
  className?: string;
  name: string;
  size?: 'sm' | 'md';
}
interface BillActorFormProps {
  className?: string;
  onChange?: (name: string) => any;
  onSave?: (name: string) => any;
}

const actorIconSizes = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
};

const actorNameSizes = {
  sm: 'text-base',
  md: 'text-xl',
};

const BillActor: React.FC<BillActorProps> = ({
  className,
  name,
  size = 'md',
}) => {
  const iconClassName = combineClassNames(
    'rounded-full flex items-center justify-center bg-blue-600 text-white mr-4 font-semibold',
    actorNameSizes[size],
    actorIconSizes[size],
  );
  const nameClassName = combineClassNames(
    'font-semibold',
    actorNameSizes[size],
  );
  return (
    <div className={'flex items-center ' + className}>
      <div className={iconClassName}>{getInitialFromName(name)}</div>
      <div className={nameClassName}>{name}</div>
    </div>
  );
};

export const BillActorForm: React.FC<BillActorFormProps> = ({
  className,
  onChange,
  onSave,
}) => {
  const [name, setName] = useState('');

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input?.current) {
      input.current.focus();
    }
  }, [input]);

  const handleNameChange = (name: string) => {
    setName(name);
    if (onChange) {
      onChange(name);
    }
  };

  const handleNameSave = () => {
    if (onSave) {
      setName('');
      onSave(name);
    }
  };

  return (
    <div className={'flex items-center ' + className}>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-xl mr-4">
        {getInitialFromName(name).length ? (
          getInitialFromName(name)
        ) : (
          <UserIcon />
        )}
      </div>
      <div className="font-bold text-xl mr-4">
        <Input
          type="text"
          placeholder="Participant name"
          value={name}
          ref={input}
          onChange={(e) => handleNameChange(e.currentTarget.value)}
        />
      </div>
      <Button level="primary" onClick={handleNameSave}>
        Save
      </Button>
    </div>
  );
};

export default BillActor;
