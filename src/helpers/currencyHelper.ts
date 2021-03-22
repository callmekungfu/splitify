import { IBillItem } from '../components/BillItem';

export const $ = (money: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'CAD' }).format(
    money,
  );

export const getSubtotal = (items: IBillItem[]) => {
  if (items?.length) {
    const subtotal = items
      .map((l) => +l.itemCost)
      .reduce((total, next) => total + next);
    return subtotal;
  }
  return 0;
};
