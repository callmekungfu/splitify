import react from 'react';
import { IParticipant } from '../types/types';
import BillActor from './Actor';
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

export const BillItem: react.FC<BillItemProps> = ({
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
