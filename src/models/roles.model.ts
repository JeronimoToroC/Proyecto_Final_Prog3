import {Entity, model, property, hasMany} from '@loopback/repository';
import {Proponente} from './proponente.model';
import {Jurados} from './jurados.model';

@model({settings: {strict: false}})
export class Roles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
