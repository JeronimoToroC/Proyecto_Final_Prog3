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
import {Recordatorios} from '../models';
import {RecordatoriosRepository} from '../repositories';

export class RecordatoriosController {
  constructor(
    @repository(RecordatoriosRepository)
    public recordatoriosRepository: RecordatoriosRepository,
  ) { }

  @authenticate("admin")
  @post('/recordatorios')
  @response(200, {
    description: 'Recordatorios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recordatorios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorios, {
            title: 'NewRecordatorios',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorios: Omit<Recordatorios, 'id'>,
  ): Promise<Recordatorios> {
    return this.recordatoriosRepository.create(recordatorios);
  }

  @authenticate("admin")
  @get('/recordatorios/count')
  @response(200, {
    description: 'Recordatorios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recordatorios) where?: Where<Recordatorios>,
  ): Promise<Count> {
    return this.recordatoriosRepository.count(where);
  }

  @authenticate("admin")
  @get('/recordatorios')
  @response(200, {
    description: 'Array of Recordatorios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recordatorios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recordatorios) filter?: Filter<Recordatorios>,
  ): Promise<Recordatorios[]> {
    return this.recordatoriosRepository.find(filter);
  }

  @authenticate("admin")
  @patch('/recordatorios')
  @response(200, {
    description: 'Recordatorios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorios, {partial: true}),
        },
      },
    })
    recordatorios: Recordatorios,
    @param.where(Recordatorios) where?: Where<Recordatorios>,
  ): Promise<Count> {
    return this.recordatoriosRepository.updateAll(recordatorios, where);
  }

  @authenticate("admin")
  @get('/recordatorios/{id}')
  @response(200, {
    description: 'Recordatorios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recordatorios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recordatorios, {exclude: 'where'}) filter?: FilterExcludingWhere<Recordatorios>
  ): Promise<Recordatorios> {
    return this.recordatoriosRepository.findById(id, filter);
  }

  @authenticate("admin")
  @patch('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorios PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorios, {partial: true}),
        },
      },
    })
    recordatorios: Recordatorios,
  ): Promise<void> {
    await this.recordatoriosRepository.updateById(id, recordatorios);
  }

  @authenticate("admin")
  @put('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorios PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recordatorios: Recordatorios,
  ): Promise<void> {
    await this.recordatoriosRepository.replaceById(id, recordatorios);
  }

  @authenticate("admin")
  @del('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorios DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordatoriosRepository.deleteById(id);
  }
}
