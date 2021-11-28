import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    /* foreignKeys: {
      fk_com_sol_id_sol: {
        name: 'fk_com_id_sol',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'solicitudId',
      },
      fk_com_sol_id_com: {
        name: 'fk_com_sol_id_com',
        entity: 'TipoComite',
        entityKey: 'id',
        foreignKey: 'tipoComiteId',
      },
    } */
  }
})
export class ComiteSolicitud extends Entity {
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
    type: 'number',
  })
  tipoComiteId?: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<ComiteSolicitud>) {
    super(data);
  }
}

export interface ComiteSolicitudRelations {
  // describe navigational properties here
}

export type ComiteSolicitudWithRelations = ComiteSolicitud & ComiteSolicitudRelations;
