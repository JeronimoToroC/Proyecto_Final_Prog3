import {Entity, model, property, hasMany} from '@loopback/repository';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';

@model({settings: {strict: false}})
export class EvaluacionSolicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  juradosId?: number;

  @property({
    type: 'date',
  })
  fechaInvitacion?: string;

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