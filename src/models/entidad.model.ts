import {Entity, hasMany, model, property} from '@loopback/repository';
import {Jurados} from './jurados.model';

@model({settings: {strict: true}})
export class Entidad extends Entity {
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

  @hasMany(() => Jurados)
  jurados: Jurados[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Entidad>) {
    super(data);
  }
}

export interface EntidadRelations {
  // describe navigational properties here
}

export type EntidadWithRelations = Entidad & EntidadRelations;
