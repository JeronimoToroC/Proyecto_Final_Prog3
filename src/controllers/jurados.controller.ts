import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Jurados} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosController {
  constructor(
    @repository(JuradosRepository)
    public juradosRepository: JuradosRepository,
  ) { }

  @authenticate("admin")
  @post('/jurados')
  @response(200, {
    description: 'Jurados model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jurados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurados, {
            title: 'NewJurados',
            exclude: ['id'],
          }),
        },
      },
    })
    jurados: Omit<Jurados, 'id'>,
  ): Promise<Jurados> {
    return this.juradosRepository.create(jurados);
  }

  @authenticate("admin")
  @get('/jurados/count')
  @response(200, {
    description: 'Jurados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jurados) where?: Where<Jurados>,
  ): Promise<Count> {
    return this.juradosRepository.count(where);
  }

  @authenticate("admin")
  @get('/jurados')
  @response(200, {
    description: 'Array of Jurados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jurados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jurados) filter?: Filter<Jurados>,
  ): Promise<Jurados[]> {
    return this.juradosRepository.find(filter);
  }

  @authenticate("admin")
  @patch('/jurados')
  @response(200, {
    description: 'Jurados PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurados, {partial: true}),
        },
      },
    })
    jurados: Jurados,
    @param.where(Jurados) where?: Where<Jurados>,
  ): Promise<Count> {
    return this.juradosRepository.updateAll(jurados, where);
  }

  @authenticate("admin")
  @get('/jurados/{id}')
  @response(200, {
    description: 'Jurados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jurados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Jurados, {exclude: 'where'}) filter?: FilterExcludingWhere<Jurados>
  ): Promise<Jurados> {
    return this.juradosRepository.findById(id, filter);
  }

  @authenticate("admin")
  @patch('/jurados/{id}')
  @response(204, {
    description: 'Jurados PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurados, {partial: true}),
        },
      },
    })
    jurados: Jurados,
  ): Promise<void> {
    await this.juradosRepository.updateById(id, jurados);
  }

  @authenticate("admin")
  @put('/jurados/{id}')
  @response(204, {
    description: 'Jurados PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() jurados: Jurados,
  ): Promise<void> {
    await this.juradosRepository.replaceById(id, jurados);
  }

  @authenticate("admin")
  @del('/jurados/{id}')
  @response(204, {
    description: 'Jurados DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradosRepository.deleteById(id);
  }
}
