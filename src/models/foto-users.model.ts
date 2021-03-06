import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class FotoUsers extends Entity {
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
  name: string;

  @property({
    type: 'number',
  })
  juradosId?: number;

  @property({
    type: 'number',
  })
  proponenteId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FotoUsers>) {
    super(data);
  }
}

export interface FotoUsersRelations {
  // describe navigational properties here
}

export type FotoUsersWithRelations = FotoUsers & FotoUsersRelations;
