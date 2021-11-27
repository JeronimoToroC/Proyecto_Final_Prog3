import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {DepartamentoProponente} from './departamento-proponente.model';
import {Facultad} from './facultad.model';
import {Proponente} from './proponente.model';

@model({
  settings: {
    /* foreignKeys: {
      fk_dep_id_fac: {
        name: 'fk_dep_id_fac',
        entity: 'Facultad',
        entityKey: 'id',
        foreignKey: 'facultadId',
      },
    } */
  }
})
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
