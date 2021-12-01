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
  Proponente,
  FotoUsers,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteFotoUsersController {
  constructor(
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Array of Proponente has many FotoUsers',
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
    return this.proponenteRepository.fotoUsers(id).find(filter);
  }

  @post('/proponentes/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(FotoUsers)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proponente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoUsers, {
            title: 'NewFotoUsersInProponente',
            exclude: ['id'],
            optional: ['proponenteId']
          }),
        },
      },
    }) fotoUsers: Omit<FotoUsers, 'id'>,
  ): Promise<FotoUsers> {
    return this.proponenteRepository.fotoUsers(id).create(fotoUsers);
  }

  @patch('/proponentes/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Proponente.FotoUsers PATCH success count',
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
    return this.proponenteRepository.fotoUsers(id).patch(fotoUsers, where);
  }

  @del('/proponentes/{id}/foto-users', {
    responses: {
      '200': {
        description: 'Proponente.FotoUsers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FotoUsers)) where?: Where<FotoUsers>,
  ): Promise<Count> {
    return this.proponenteRepository.fotoUsers(id).delete(where);
  }
}
