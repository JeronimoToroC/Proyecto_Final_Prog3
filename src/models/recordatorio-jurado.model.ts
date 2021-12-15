import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class RecordatorioJurado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  juradosId?: number;

  @property({
    type: 'string',
  })
  fecha?: string;

  @property({
    type: 'string',
  })
  resumen?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RecordatorioJurado>) {
    super(data);
  }
}

export interface RecordatorioJuradoRelations {
  // describe navigational properties here
}

export type RecordatorioJuradoWithRelations = RecordatorioJurado & RecordatorioJuradoRelations;
