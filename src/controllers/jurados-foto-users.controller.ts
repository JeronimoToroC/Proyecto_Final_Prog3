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
  FotoUsers,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosFotoUsersController {
  constructor(
    @repository(JuradosRepository) protected juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Array of Jurados has many FotoUsers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FotoUsers)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FotoUsers>,
  ): Promise<FotoUsers[]> {
    return this.juradosRepository.fotoUsers(id).find(filter);
  }

  @post('/jurados/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Jurados model instance',
        content: {'application/json': {schema: getModelSchemaRef(FotoUsers)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoUsers, {
            title: 'NewFotoUsersInJurados',
            exclude: ['id'],
            optional: ['juradosId']
          }),
        },
      },
    }) fotoUsers: Omit<FotoUsers, 'id'>,
  ): Promise<FotoUsers> {
    return this.juradosRepository.fotoUsers(id).create(fotoUsers);
  }

  @patch('/jurados/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Jurados.FotoUsers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoUsers, {partial: true}),
        },
      },
    })
    fotoUsers: Partial<FotoUsers>,
    @param.query.object('where', getWhereSchemaFor(FotoUsers)) where?: Where<FotoUsers>,
  ): Promise<Count> {
    return this.juradosRepository.fotoUsers(id).patch(fotoUsers, where);
  }

  @del('/jurados/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Jurados.FotoUsers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FotoUsers)) where?: Where<FotoUsers>,
  ): Promise<Count> {
    return this.juradosRepository.fotoUsers(id).delete(where);
  }
}
