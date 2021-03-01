import { useEffect, useRef, useState } from 'react';
import { getInitialFromName } from '../helpers/participantHelper';
import { Button } from './Button/Button';
import Input from './Input';

interface BillActorProps {
  className?: string;
  name: string;
}
interface BillActorFormProps {
  className?: string;
  onChange?: (name: string) => any;
  onSave?: (name: string) => any;
}

const BillActor: React.FC<BillActorProps> = ({ className, name }) => (
  <div className={'flex items-center ' + className}>
    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-xl mr-4">
      {getInitialFromName(name)}
    </div>
    <div className="font-bold text-xl">{name}</div>
  </div>
);

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
      onSave(name);
    }
  };

  return (
    <div className={'flex items-center ' + className}>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-xl mr-4">
        {getInitialFromName(name)}
      </div>
      <div className="font-bold text-xl mr-4">
        <Input
          type="text"
          placeholder="Participant name"
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
