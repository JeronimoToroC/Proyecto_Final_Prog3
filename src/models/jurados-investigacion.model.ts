import {Entity, model, property} from '@loopback/repository';

@model()
export class JuradosInvestigacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  juradosId?: number;

  @property({
    type: 'number',
  })
  lineasInvestigacionId?: number;

  constructor(data?: Partial<JuradosInvestigacion>) {
    super(data);
  }
}

export interface JuradosInvestigacionRelations {
  // describe navigational properties here
}

export type JuradosInvestigacionWithRelations = JuradosInvestigacion & JuradosInvestigacionRelations;
