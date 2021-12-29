import { action, makeObservable, observable, reaction } from 'mobx';
import { IBillItem } from '../components/BillItem';
import { getRandomID } from '../helpers/common';
import { Participant } from './Actor';
import { getSubtotal } from '../helpers/currencyHelper';
import { splitBill } from '../lib/split';

export class BillItem {
  id: string;
  itemName: string;
  itemDescription?: string;
  participants: Participant[];
  itemCost: number;

  constructor(data: IBillItem) {
    makeObservable(this, {
      id: observable,
      itemName: observable,
      itemDescription: observable,
      participants: observable,
      itemCost: observable,
      edit: action,
    });
    this.id = data.id ?? getRandomID();
    this.itemName = data.itemName;
    this.itemDescription = data.itemDescription;
    this.participants = data.participants;
    this.itemCost = data.itemCost;
  }

  edit(data: IBillItem) {
    this.itemName = data.itemName;
    this.itemDescription = data.itemDescription;
    this.participants = data.participants;
    this.itemCost = data.itemCost;
  }
}

export class Bill {
  subtotal = 0;

  taxFees = 0;

  grandTotal = 0;

  split: Record<string, number> = {};

  constructor(public items: BillItem[] = []) {
    makeObservable(this, {
      items: observable.shallow,
      subtotal: observable,
      taxFees: observable,
      grandTotal: observable,
      split: observable,
      add: action,
      delete: action,
      setTaxFees: action,
      setGrandTotal: action,
      updateAmounts: action,
    });
    this.updateAmounts();
    reaction(
      // Snapshot the data into a string format to ensure
      // deep reactivity assertion.
      // A better way to do this is to have an `update` function
      // in the bill class that calls bill item update and cost calculation
      // actions.
      // but that is just too much work
      () => JSON.stringify(this.items.map((i) => i)),
      () => {
        this.updateAmounts();
      },
    );
  }

  add(data: IBillItem) {
    this.items = [new BillItem(data), ...this.items];
  }

  delete(itemToDelete: BillItem) {
    this.items = this.items.filter((i) => i.id !== itemToDelete.id);
  }

  setTaxFees(amount: number) {
    this.taxFees = amount;
    this.updateAmounts();
  }

  setGrandTotal(amount: number) {
    this.grandTotal = amount;
    const map = splitBill(this.items, this.taxFees, amount);
    this.split = map;
  }

  updateAmounts() {
    this.subtotal = getSubtotal(this.items);
    this.grandTotal = this.subtotal + this.taxFees;
    const map = splitBill(this.items, this.taxFees);
    this.split = map;
  }
}
