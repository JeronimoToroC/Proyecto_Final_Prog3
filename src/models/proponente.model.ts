import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoVinculacion} from './tipo-vinculacion.model';
import {Solicitud} from './solicitud.model';

@model()
export class Proponente extends Entity {
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
  documentNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  otherNames?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname2: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  tel?: string;

  @property({
    type: 'string',
  })
  foto?: any;

  @belongsTo(() => TipoVinculacion, {name: 'perteneceTipoVinculacion'})
  tipoVinculacionId: number;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
