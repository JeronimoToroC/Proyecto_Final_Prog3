import {Entity, model, property} from '@loopback/repository';

@model()
export class EvaluacionComite extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  invitationDate: string;

  @property({
    type: 'date',
    required: true,
  })
  answerDate: string;

  @property({
    type: 'string',
    required: true,
  })
  answer: string;

  @property({
    type: 'string',
    required: true,
  })
  observations: string;


  constructor(data?: Partial<EvaluacionComite>) {
    super(data);
  }
}

export interface EvaluacionComiteRelations {
  // describe navigational properties here
}

export type EvaluacionComiteWithRelations = EvaluacionComite & EvaluacionComiteRelations;
