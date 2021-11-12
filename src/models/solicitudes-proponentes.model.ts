import {Entity, model, property} from '@loopback/repository';

@model()
export class SolicitudesProponentes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  proponenteId?: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<SolicitudesProponentes>) {
    super(data);
  }
}

export interface SolicitudesProponentesRelations {
  // describe navigational properties here
}

export type SolicitudesProponentesWithRelations = SolicitudesProponentes & SolicitudesProponentesRelations;
