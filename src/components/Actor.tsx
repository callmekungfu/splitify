import { getInitialFromName } from '../helpers/participantHelper';

interface BillActorProps {
  className?: string;
  name: string;
}

const BillActor: React.FC<BillActorProps> = ({ className, name }) => (
  <div className={'flex items-center ' + className}>
    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold text-xl mr-4">
      {getInitialFromName(name)}
    </div>
    <div className="font-bold text-xl">{name}</div>
  </div>
);

export default BillActor;
