import {Entity, model, property} from '@loopback/repository';

@model()
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
