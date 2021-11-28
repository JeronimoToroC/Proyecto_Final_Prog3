import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    /* foreignKeys: {
      fk_jur_inv_id_jur: {
        name: 'fk_jur_inv_id_jur',
        entity: 'Jurados',
        entityKey: 'id',
        foreignKey: 'juradosId',
      },
      fk_jur_inv_id_lininv: {
        name: 'fk_jur_inv_id_lininv',
        entity: 'Jurados',
        entityKey: 'id',
        foreignKey: 'lineasInvestigacionId',
      }
    } */
  }
})
export class JuradosInvestigacion extends Entity {
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
    type: 'number',
  })
  lineasInvestigacionId?: number;

  constructor(data?: Partial<JuradosInvestigacion>) {
    super(data);
  }
}

export interface JuradosInvestigacionRelations {
  // describe navigational properties here
}

export type JuradosInvestigacionWithRelations = JuradosInvestigacion & JuradosInvestigacionRelations;
