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
Usuario,
UsuarioRoles,
Roles,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioRolesController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/roles', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Roles through UsuarioRoles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Roles>,
  ): Promise<Roles[]> {
    return this.usuarioRepository.muchosamuchosUsuariosRoles(id).find(filter);
  }

  @post('/usuarios/{id}/roles', {
    responses: {
      '200': {
        description: 'create a Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roles)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRolesInUsuario',
            exclude: ['id'],
          }),
        },
      },
    }) roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.usuarioRepository.muchosamuchosUsuariosRoles(id).create(roles);
  }

  @patch('/usuarios/{id}/roles', {
    responses: {
      '200': {
        description: 'Usuario.Roles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Partial<Roles>,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.usuarioRepository.muchosamuchosUsuariosRoles(id).patch(roles, where);
  }

  @del('/usuarios/{id}/roles', {
    responses: {
      '200': {
        description: 'Usuario.Roles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.usuarioRepository.muchosamuchosUsuariosRoles(id).delete(where);
  }
}
