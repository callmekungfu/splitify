import { action, makeObservable, observable } from 'mobx';
import { generateId } from '../helpers/participantHelper';
import { LS } from '../helpers/store';

export class Participant {
  constructor(public name: string, public id = generateId()) {
    makeObservable(this, {
      name: observable,
      id: observable,
    });
  }
}

export class ParticipantList {
  constructor(public participants: Participant[] = []) {
    makeObservable(this, {
      participants: observable,
      create: action,
      remove: action,
    });
  }

  create(name: string) {
    if (!name.trim().length) {
      return;
    }
    this.participants = [new Participant(name), ...this.participants];
    LS.put('participants', this.participants);
  }

  remove(participant: Participant) {
    const ps = this.participants.filter((p) => p.id !== participant.id);
    this.participants = ps;
    LS.put('participants', ps);
  }
}
