import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<LineasInvestigacion>) {
    super(data);
  }
}

export interface LineasInvestigacionRelations {
  // describe navigational properties here
}

export type LineasInvestigacionWithRelations = LineasInvestigacion & LineasInvestigacionRelations;
