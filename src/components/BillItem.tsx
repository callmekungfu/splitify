import { Participant } from '../data/Actor';
import BillActor from './Actor';
import { Button } from './Button/Button';
import { $ } from '../helpers/currencyHelper';
import { BillItem } from '../data/Bill';

// TODO move to dedicated types file
export interface IBillItem {
  id: string;
  itemName: string;
  itemDescription?: string;
  participants: Participant[];
  itemCost: number;
}

interface BillItemProps {
  item: BillItem;
  onRemove?: (item: BillItem) => any;
  onEdit?: (item: BillItem) => any;
}

export const CardBillItem: React.FC<BillItemProps> = ({
  item,
  onRemove,
  onEdit,
}) => {
  const removeItem = () => {
    if (onRemove) {
      onRemove(item);
    }
  };
  const editItem = () => {
    if (onEdit) {
      onEdit(item);
    }
  };
  return (
    <div className="p-6 shadow-md bg-white rounded-md mb-3">
      <div className="flex flex-row items-center justify-between w-auto">
        <div>
          <h3 className="text-xl font-medium leading-6 text-gray-900 capitalize">
            {item.itemName}
          </h3>
          <div className="mb-3">{item.itemDescription}</div>
          <div>
            {item.participants.map((p) => (
              <BillActor name={p.name} key={p.id} size="sm" className="my-2" />
            ))}
          </div>
        </div>{' '}
        <div className="text-2xl">{$(item.itemCost)}</div>
      </div>
      <div className="flex justify-end">
        <Button onClick={removeItem} level="danger" className="mr-2">
          Remove
        </Button>
        <Button onClick={editItem} level="classic">
          Edit
        </Button>
      </div>
    </div>
  );
};
