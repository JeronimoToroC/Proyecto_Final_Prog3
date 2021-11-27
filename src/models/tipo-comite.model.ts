import {Entity, hasMany, model, property} from '@loopback/repository';
import {ComiteSolicitud} from './comite-solicitud.model';
import {Solicitud} from './solicitud.model';

@model()
export class TipoComite extends Entity {
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
  nombre: string;

  @hasMany(() => Solicitud, {through: {model: () => ComiteSolicitud}})
  tieneComiteSolicitud: Solicitud[];

  constructor(data?: Partial<TipoComite>) {
    super(data);
  }
}

export interface TipoComiteRelations {
  // describe navigational properties here
}

export type TipoComiteWithRelations = TipoComite & TipoComiteRelations;
