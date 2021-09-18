import react from 'react';
import { IParticipant } from '../types/types';
import BillActor from './Actor';
import { Button } from './Button/Button';
import { LinkButton } from './Button/LinkButton';

// TODO move to dedicated types file
export interface IBillItem {
  id: string;
  itemName: string;
  itemDescription?: string;
  participants: IParticipant[];
  itemCost: number;
}

interface BillItemProps {
  item: IBillItem;
  onRemove?: (item: IBillItem) => any;
  onEdit?: (item: IBillItem) => any;
}

export const TableBillItem: react.FC<BillItemProps> = ({
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
    <tr>
      <td>{item.itemName}</td>
      <td>{item.itemDescription}</td>
      <td>
        {item.participants.map((p) => (
          <BillActor name={p.name} key={p.uuid} size="sm" className="my-2" />
        ))}
      </td>
      <td>{item.itemCost}</td>
      <td>
        <LinkButton onClick={removeItem} state="danger">
          Remove
        </LinkButton>
        <LinkButton onClick={editItem}>Edit</LinkButton>
      </td>
    </tr>
  );
};

export const CardBillItem: react.FC<BillItemProps> = ({
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
              <BillActor
                name={p.name}
                key={p.uuid}
                size="sm"
                className="my-2"
              />
            ))}
          </div>
        </div>{' '}
        <div className="text-2xl">
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'CAD',
          }).format(item.itemCost)}
        </div>
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
