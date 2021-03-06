import {Entity, model, property, hasMany} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

@model({settings: {strict: true}})
export class NotificarJurado extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  fechaInvitacion: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  @property({
    type: 'number',
  })
  juradosId?: number;

  @hasMany(() => EvaluacionSolicitud)
  evaluacionSolicituds: EvaluacionSolicitud[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<NotificarJurado>) {
    super(data);
  }
}

export interface NotificarJuradoRelations {
  // describe navigational properties here
}

export type NotificarJuradoWithRelations = NotificarJurado & NotificarJuradoRelations;
