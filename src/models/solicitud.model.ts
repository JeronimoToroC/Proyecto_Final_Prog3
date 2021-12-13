import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {NotificarJurado} from './notificar-jurado.model';
import {Proponente} from './proponente.model';
import {Recordatorios} from './recordatorios.model';

@model({
  settings: {
    /* foreignKeys: {
      fk_sol_id_mod: {
        name: 'fk_sol_id_mod',
        entity: 'Modalidad',
        entityKey: 'id',
        foreignKey: 'modalidadId',
      },
      fk_sol_id_lin_inv: {
        name: 'fk_sol_id_lin_inv',
        entity: 'LineasInvestigacion',
        entityKey: 'id',
        foreignKey: 'lineasInvestigacionId',
      },
      fk_sol_id_tip_sol: {
        name: 'fk_sol_id_tip_sol',
        entity: 'TipoSolicitud',
        entityKey: 'id',
        foreignKey: 'tipoSolicitudId',
      },
      fk_sol_id_prop: {
        name: 'fk_sol_id_prop',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'proponenteId',
      },
    } */
  }
})
export class Solicitud extends Entity {
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
  dateRad: string;

  @property({
    type: 'string',
    required: true,
  })
  workName: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  comiteType: object[];

  @property({
    type: 'any',
    required: true,
  })
  file: any;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
  })
  lineasInvestigacionId?: number;

  @property({
    type: 'number',
  })
  modalidadId?: number;

  @hasMany(() => Recordatorios)
  tienemuchosRecordatorios: Recordatorios[];

  @property({
    type: 'number',
  })
  tipoSolicitudId?: number;

  @belongsTo(() => Proponente)
  proponenteId: number;

  @hasMany(() => NotificarJurado)
  notificarJurados: NotificarJurado[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
