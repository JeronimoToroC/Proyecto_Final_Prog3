import {Entity, model, property} from '@loopback/repository';

@model()
export class Jurados extends Entity {
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

  @property({
    type: 'string',
  })
  tel?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'any',
    required: true,
  })
  entity: any;


  constructor(data?: Partial<Jurados>) {
    super(data);
  }
}

export interface JuradosRelations {
  // describe navigational properties here
}

export type JuradosWithRelations = Jurados & JuradosRelations;
