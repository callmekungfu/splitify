import react from 'react';
import { IParticipant } from '../types/types';
import BillActor from './Actor';
import { LinkButton } from './Button/LinkButton';

export interface IBillItem {
  id: string;
  itemName: string;
  itemDescription?: string;
  participants: IParticipant[];
  itemCost: number;
}

interface BillItemProps {
  item: IBillItem;
}

export const BillItem: react.FC<BillItemProps> = ({ item }) => {
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
        <LinkButton>Edit</LinkButton>
        <LinkButton>Options</LinkButton>
        <hr className="my-2" />
        <LinkButton>Remove</LinkButton>
      </td>
    </tr>
  );
};
