/**
 * Function and objects for splitting bills
 */

import { IBillItem } from '../components/BillItem';
import { getSubtotal } from '../helpers/currencyHelper';

export const splitBill = (
  items: IBillItem[],
  taxFees = 0,
  grand?: number,
): Record<string, number> => {
  const subtotal = getSubtotal(items);

  if (subtotal === 0) {
    return {};
  }
  const participants = items.map((i) => i.participants).flat();
  const pMap: Record<string, number> = {};
  for (const p of participants) {
    if (!(p.id in pMap)) {
      pMap[p.id] = 0;
    }
  }
  for (const item of items) {
    // Assume the participants array is greater than 0
    const split = +item.itemCost / item.participants.length;
    for (const p of item.participants) {
      pMap[p.id] += split;
    }
  }

  if (grand) {
    for (const key of Object.keys(pMap)) {
      const portion = pMap[key] / subtotal;
      pMap[key] = grand * portion;
    }
  } else if (taxFees > 0) {
    for (const key of Object.keys(pMap)) {
      const portion = pMap[key] / subtotal;
      pMap[key] += taxFees * portion;
    }
  }

  for (const key of Object.keys(pMap)) {
    pMap[key] = +pMap[key].toFixed(2);
  }

  return pMap;
};
