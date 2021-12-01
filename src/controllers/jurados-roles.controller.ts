import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jurados,
  Roles,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosRolesController {
  constructor(
    @repository(JuradosRepository)
    public juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to Jurados',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.number('id') id: typeof Jurados.prototype.id,
  ): Promise<Roles> {
    return this.juradosRepository.roles(id);
  }
}
