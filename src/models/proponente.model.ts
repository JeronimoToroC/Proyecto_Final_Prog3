import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

const URLBASE = "http://localhost:3001"

@model()
export class Proponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  /*   @property({
      type: 'string',
      id: true,
    })
    idUsers?: string; */

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
