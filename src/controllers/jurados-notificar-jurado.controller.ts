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
  NotificarJurado,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosNotificarJuradoController {
  constructor(
    @repository(JuradosRepository) protected juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Array of Jurados has many NotificarJurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NotificarJurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<NotificarJurado>,
  ): Promise<NotificarJurado[]> {
    return this.juradosRepository.notificarJurados(id).find(filter);
  }

  @post('/jurados/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Jurados model instance',
        content: {'application/json': {schema: getModelSchemaRef(NotificarJurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarJurado, {
            title: 'NewNotificarJuradoInJurados',
            exclude: ['id'],
            optional: ['juradosId']
          }),
        },
      },
    }) notificarJurado: Omit<NotificarJurado, 'id'>,
  ): Promise<NotificarJurado> {
    return this.juradosRepository.notificarJurados(id).create(notificarJurado);
  }

  @patch('/jurados/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Jurados.NotificarJurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarJurado, {partial: true}),
        },
      },
    })
    notificarJurado: Partial<NotificarJurado>,
    @param.query.object('where', getWhereSchemaFor(NotificarJurado)) where?: Where<NotificarJurado>,
  ): Promise<Count> {
    return this.juradosRepository.notificarJurados(id).patch(notificarJurado, where);
  }

  @del('/jurados/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Jurados.NotificarJurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(NotificarJurado)) where?: Where<NotificarJurado>,
  ): Promise<Count> {
    return this.juradosRepository.notificarJurados(id).delete(where);
  }
}
