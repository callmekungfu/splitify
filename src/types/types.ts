export interface IParticipant {
  name: string;
  uuid: string;
}

export interface IItem {
  name: string;
  description?: string;
  cost: number;
  participants?: IParticipant[];
  participant_weight?: Record<string, number>;
  taxable?: boolean;
}
