import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class LineasInvestigacion extends Entity {
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
  name: string;

  @hasMany(() => Solicitud)
  tienemuchosSolicitud: Solicitud[];

  constructor(data?: Partial<LineasInvestigacion>) {
    super(data);
  }
}

export interface LineasInvestigacionRelations {
  // describe navigational properties here
}

export type LineasInvestigacionWithRelations = LineasInvestigacion & LineasInvestigacionRelations;
