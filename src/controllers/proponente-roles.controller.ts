import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proponente,
  Roles,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteRolesController {
  constructor(
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to Proponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.number('id') id: typeof Proponente.prototype.id,
  ): Promise<Roles> {
    return this.proponenteRepository.roles(id);
  }
}
