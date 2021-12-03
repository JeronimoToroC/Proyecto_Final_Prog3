import {Entity, hasMany, model, property} from '@loopback/repository';
import {Jurados} from './jurados.model';
import {Proponente} from './proponente.model';

@model({settings: {strict: true}})
export class Roles extends Entity {
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
  nombre: string;

  @hasMany(() => Proponente)
  proponentes: Proponente[];

  @hasMany(() => Jurados)
  jurados: Jurados[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
