import {Entity, hasMany, model, property} from '@loopback/repository';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';

@model({
  settings: {
    /* foreignKeys: {
      fk_ev_sol_id_jur: {
        name: 'fk_ev_sol_id_jur',
        entity: 'Jurados',
        entityKey: 'id',
        foreignKey: 'juradosId',
      }
    } */
  }
})
export class EvaluacionSolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  fechaRespuesta?: string;

  @property({
    type: 'boolean',
  })
  respuesta?: true;

  @property({
    type: 'string',
  })
  observaciones?: 'string';

  @hasMany(() => ResultadoEvaluacion)
  tienemuchosResultadoEvaluacion: ResultadoEvaluacion[];

  @property({
    type: 'number',
  })
  notificarJuradoId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<EvaluacionSolicitud>) {
    super(data);
  }
}

export interface EvaluacionSolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionSolicitudWithRelations = EvaluacionSolicitud & EvaluacionSolicitudRelations;
