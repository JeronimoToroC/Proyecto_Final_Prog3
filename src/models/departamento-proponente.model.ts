import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    /* foreignKeys: {
      fk_dep_id_fac: {
        name: 'fk_dep_prop_id_dep',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'departamentoId',
      },
    } */
  }
})
export class DepartamentoProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  departamentoId?: number;

  @property({
    type: 'number',
  })
  proponenteId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DepartamentoProponente>) {
    super(data);
  }
}

export interface DepartamentoProponenteRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteWithRelations = DepartamentoProponente & DepartamentoProponenteRelations;
