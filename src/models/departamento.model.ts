import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Facultad} from './facultad.model';
import {Proponente} from './proponente.model';
import {DepartamentoProponente} from './departamento-proponente.model';

@model()
export class Departamento extends Entity {
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

  @belongsTo(() => Facultad, {name: 'perteneceFacultad'})
  facultadId: number;

  @hasMany(() => Proponente, {through: {model: () => DepartamentoProponente}})
  muchosDepartamentoProponente: Proponente[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
