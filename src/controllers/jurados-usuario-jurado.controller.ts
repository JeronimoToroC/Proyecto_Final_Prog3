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
  UsuarioJurado,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosUsuarioJuradoController {
  constructor(
    @repository(JuradosRepository) protected juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/usuario-jurados', {
    responses: {
      '200': {
        description: 'Array of Jurados has many UsuarioJurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UsuarioJurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UsuarioJurado>,
  ): Promise<UsuarioJurado[]> {
    return this.juradosRepository.tieneMuchosUsuarioJurado(id).find(filter);
  }

  @post('/jurados/{id}/usuario-jurados', {
    responses: {
      '200': {
        description: 'Jurados model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioJurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {
            title: 'NewUsuarioJuradoInJurados',
            exclude: ['id'],
            optional: ['juradosId']
          }),
        },
      },
    }) usuarioJurado: Omit<UsuarioJurado, 'id'>,
  ): Promise<UsuarioJurado> {
    return this.juradosRepository.tieneMuchosUsuarioJurado(id).create(usuarioJurado);
  }

  @patch('/jurados/{id}/usuario-jurados', {
    responses: {
      '200': {
        description: 'Jurados.UsuarioJurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {partial: true}),
        },
      },
    })
    usuarioJurado: Partial<UsuarioJurado>,
    @param.query.object('where', getWhereSchemaFor(UsuarioJurado)) where?: Where<UsuarioJurado>,
  ): Promise<Count> {
    return this.juradosRepository.tieneMuchosUsuarioJurado(id).patch(usuarioJurado, where);
  }

  @del('/jurados/{id}/usuario-jurados', {
    responses: {
      '200': {
        description: 'Jurados.UsuarioJurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UsuarioJurado)) where?: Where<UsuarioJurado>,
  ): Promise<Count> {
    return this.juradosRepository.tieneMuchosUsuarioJurado(id).delete(where);
  }
}
