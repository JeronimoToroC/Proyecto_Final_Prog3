import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Jurados,
  RecordatorioJurado,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosRecordatorioJuradoController {
  constructor(
    @repository(JuradosRepository) protected juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/recordatorio-jurados', {
    responses: {
      '200': {
        description: 'Array of Jurados has many RecordatorioJurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RecordatorioJurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RecordatorioJurado>,
  ): Promise<RecordatorioJurado[]> {
    return this.juradosRepository.recordatorioJurados(id).find(filter);
  }

  @post('/jurados/{id}/recordatorio-jurados', {
    responses: {
      '200': {
        description: 'Jurados model instance',
        content: {'application/json': {schema: getModelSchemaRef(RecordatorioJurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecordatorioJurado, {
            title: 'NewRecordatorioJuradoInJurados',
            exclude: ['id'],
            optional: ['juradosId']
          }),
        },
      },
    }) recordatorioJurado: Omit<RecordatorioJurado, 'id'>,
  ): Promise<RecordatorioJurado> {
    return this.juradosRepository.recordatorioJurados(id).create(recordatorioJurado);
  }

  @patch('/jurados/{id}/recordatorio-jurados', {
    responses: {
      '200': {
        description: 'Jurados.RecordatorioJurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecordatorioJurado, {partial: true}),
        },
      },
    })
    recordatorioJurado: Partial<RecordatorioJurado>,
    @param.query.object('where', getWhereSchemaFor(RecordatorioJurado)) where?: Where<RecordatorioJurado>,
  ): Promise<Count> {
    return this.juradosRepository.recordatorioJurados(id).patch(recordatorioJurado, where);
  }

  @del('/jurados/{id}/recordatorio-jurados', {
    responses: {
      '200': {
        description: 'Jurados.RecordatorioJurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RecordatorioJurado)) where?: Where<RecordatorioJurado>,
  ): Promise<Count> {
    return this.juradosRepository.recordatorioJurados(id).delete(where);
  }
}
