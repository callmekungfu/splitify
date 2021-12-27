import { action, makeObservable, observable } from 'mobx';
import { IBillItem } from '../components/BillItem';
import { getRandomID } from '../helpers/common';
import { Participant } from './Actor';

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
    this.id = data.id;
    this.itemName = data.itemName;
    this.itemDescription = data.itemDescription;
    this.participants = data.participants;
    this.itemCost = data.itemCost;
  }
}

export class Bill {
  constructor(public items: BillItem[] = []) {
    makeObservable(this, {
      items: observable,
      create: action,
    });
  }

  create(data: IBillItem) {
    console.log(data);

    this.items = [new BillItem(data), ...this.items];
  }

  update(data: IBillItem) {
    console.log(data);

    if (!data.id) {
      throw Error('Data ID is not provided');
    }

    const i = this.items.findIndex((i) => i.id === data.id);
    const copy = [...this.items];
    copy[i] = new BillItem(data);
  }
}
