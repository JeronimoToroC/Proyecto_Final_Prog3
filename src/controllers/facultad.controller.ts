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
import {Facultad} from '../models';
import {FacultadRepository} from '../repositories';

export class FacultadController {
  constructor(
    @repository(FacultadRepository)
    public facultadRepository: FacultadRepository,
  ) { }

  //@authenticate("admin")
  @post('/facultads')
  @response(200, {
    description: 'Facultad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Facultad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facultad, {
            title: 'NewFacultad',
            exclude: ['id'],
          }),
        },
      },
    })
    facultad: Omit<Facultad, 'id'>,
  ): Promise<Facultad> {
    return this.facultadRepository.create(facultad);
  }

  //@authenticate("admin")
  @get('/facultads/count')
  @response(200, {
    description: 'Facultad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Facultad) where?: Where<Facultad>,
  ): Promise<Count> {
    return this.facultadRepository.count(where);
  }

  //@authenticate("admin")
  @get('/facultads')
  @response(200, {
    description: 'Array of Facultad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Facultad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Facultad) filter?: Filter<Facultad>,
  ): Promise<Facultad[]> {
    return this.facultadRepository.find(filter);
  }

  //@authenticate("admin")
  @patch('/facultads')
  @response(200, {
    description: 'Facultad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facultad, {partial: true}),
        },
      },
    })
    facultad: Facultad,
    @param.where(Facultad) where?: Where<Facultad>,
  ): Promise<Count> {
    return this.facultadRepository.updateAll(facultad, where);
  }

  //@authenticate("admin")
  @get('/facultads/{id}')
  @response(200, {
    description: 'Facultad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Facultad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Facultad, {exclude: 'where'}) filter?: FilterExcludingWhere<Facultad>
  ): Promise<Facultad> {
    return this.facultadRepository.findById(id, filter);
  }

  //@authenticate("admin")
  @patch('/facultads/{id}')
  @response(204, {
    description: 'Facultad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facultad, {partial: true}),
        },
      },
    })
    facultad: Facultad,
  ): Promise<void> {
    await this.facultadRepository.updateById(id, facultad);
  }

  //@authenticate("admin")
  @put('/facultads/{id}')
  @response(204, {
    description: 'Facultad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facultad: Facultad,
  ): Promise<void> {
    await this.facultadRepository.replaceById(id, facultad);
  }

  //@authenticate("admin")
  @del('/facultads/{id}')
  @response(204, {
    description: 'Facultad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facultadRepository.deleteById(id);
  }
}
