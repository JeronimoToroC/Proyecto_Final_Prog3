import {Entity, model, property} from '@loopback/repository';

@model()
export class Recordatorios extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  answer: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  resume: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  hour: string;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<Recordatorios>) {
    super(data);
  }
}

export interface RecordatoriosRelations {
  // describe navigational properties here
}

export type RecordatoriosWithRelations = Recordatorios & RecordatoriosRelations;
