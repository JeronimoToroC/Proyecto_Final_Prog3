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
import {LineasInvestigacion} from '../models';
import {LineasInvestigacionRepository} from '../repositories';

export class LineasInvestigacionController {
  constructor(
    @repository(LineasInvestigacionRepository)
    public lineasInvestigacionRepository: LineasInvestigacionRepository,
  ) { }

  //@authenticate("admin")
  @post('/lineas-investigacions')
  @response(200, {
    description: 'LineasInvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineasInvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineasInvestigacion, {
            title: 'NewLineasInvestigacion',
            exclude: ['id'],
          }),
        },
      },
    })
    lineasInvestigacion: Omit<LineasInvestigacion, 'id'>,
  ): Promise<LineasInvestigacion> {
    return this.lineasInvestigacionRepository.create(lineasInvestigacion);
  }

  //@authenticate("admin")
  @get('/lineas-investigacions/count')
  @response(200, {
    description: 'LineasInvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineasInvestigacion) where?: Where<LineasInvestigacion>,
  ): Promise<Count> {
    return this.lineasInvestigacionRepository.count(where);
  }

  //@authenticate("admin")
  @get('/lineas-investigacions')
  @response(200, {
    description: 'Array of LineasInvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineasInvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineasInvestigacion) filter?: Filter<LineasInvestigacion>,
  ): Promise<LineasInvestigacion[]> {
    return this.lineasInvestigacionRepository.find(filter);
  }

  //@authenticate("admin")
  @patch('/lineas-investigacions')
  @response(200, {
    description: 'LineasInvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineasInvestigacion, {partial: true}),
        },
      },
    })
    lineasInvestigacion: LineasInvestigacion,
    @param.where(LineasInvestigacion) where?: Where<LineasInvestigacion>,
  ): Promise<Count> {
    return this.lineasInvestigacionRepository.updateAll(lineasInvestigacion, where);
  }

  //@authenticate("admin")
  @get('/lineas-investigacions/{id}')
  @response(200, {
    description: 'LineasInvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineasInvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LineasInvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<LineasInvestigacion>
  ): Promise<LineasInvestigacion> {
    return this.lineasInvestigacionRepository.findById(id, filter);
  }

  //@authenticate("admin")
  @patch('/lineas-investigacions/{id}')
  @response(204, {
    description: 'LineasInvestigacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineasInvestigacion, {partial: true}),
        },
      },
    })
    lineasInvestigacion: LineasInvestigacion,
  ): Promise<void> {
    await this.lineasInvestigacionRepository.updateById(id, lineasInvestigacion);
  }

  //@authenticate("admin")
  @put('/lineas-investigacions/{id}')
  @response(204, {
    description: 'LineasInvestigacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lineasInvestigacion: LineasInvestigacion,
  ): Promise<void> {
    await this.lineasInvestigacionRepository.replaceById(id, lineasInvestigacion);
  }

  //@authenticate("admin")
  @del('/lineas-investigacions/{id}')
  @response(204, {
    description: 'LineasInvestigacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lineasInvestigacionRepository.deleteById(id);
  }
}
