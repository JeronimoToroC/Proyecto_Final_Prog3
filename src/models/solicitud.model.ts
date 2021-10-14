import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
