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
  Roles,
  Jurados,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesJuradosController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/jurados', {
    responses: {
      '200': {
        description: 'Array of Roles has many Jurados',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurados)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Jurados>,
  ): Promise<Jurados[]> {
    return this.rolesRepository.jurados(id).find(filter);
  }

  @post('/roles/{id}/jurados', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jurados)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Roles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurados, {
            title: 'NewJuradosInRoles',
            exclude: ['id'],
            optional: ['rolesId']
          }),
        },
      },
    }) jurados: Omit<Jurados, 'id'>,
  ): Promise<Jurados> {
    return this.rolesRepository.jurados(id).create(jurados);
  }

  @patch('/roles/{id}/jurados', {
    responses: {
      '200': {
        description: 'Roles.Jurados PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.rolesRepository.jurados(id).patch(jurados, where);
  }

  @del('/roles/{id}/jurados', {
    responses: {
      '200': {
        description: 'Roles.Jurados DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Jurados)) where?: Where<Jurados>,
  ): Promise<Count> {
    return this.rolesRepository.jurados(id).delete(where);
  }
}
