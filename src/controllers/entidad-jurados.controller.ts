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
  Entidad,
  Jurados,
} from '../models';
import {EntidadRepository} from '../repositories';

export class EntidadJuradosController {
  constructor(
    @repository(EntidadRepository) protected entidadRepository: EntidadRepository,
  ) { }

  @get('/entidads/{id}/jurados', {
    responses: {
      '200': {
        description: 'Array of Entidad has many Jurados',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurados)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Jurados>,
  ): Promise<Jurados[]> {
    return this.entidadRepository.jurados(id).find(filter);
  }

  @post('/entidads/{id}/jurados', {
    responses: {
      '200': {
        description: 'Entidad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jurados)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Entidad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurados, {
            title: 'NewJuradosInEntidad',
            exclude: ['id'],
            optional: ['entidadId']
          }),
        },
      },
    }) jurados: Omit<Jurados, 'id'>,
  ): Promise<Jurados> {
    return this.entidadRepository.jurados(id).create(jurados);
  }

  @patch('/entidads/{id}/jurados', {
    responses: {
      '200': {
        description: 'Entidad.Jurados PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurados, {partial: true}),
        },
      },
    })
    jurados: Partial<Jurados>,
    @param.query.object('where', getWhereSchemaFor(Jurados)) where?: Where<Jurados>,
  ): Promise<Count> {
    return this.entidadRepository.jurados(id).patch(jurados, where);
  }

  @del('/entidads/{id}/jurados', {
    responses: {
      '200': {
        description: 'Entidad.Jurados DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Jurados)) where?: Where<Jurados>,
  ): Promise<Count> {
    return this.entidadRepository.jurados(id).delete(where);
  }
}
