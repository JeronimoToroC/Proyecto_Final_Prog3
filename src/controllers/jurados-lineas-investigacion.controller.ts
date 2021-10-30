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
JuradosInvestigacion,
LineasInvestigacion,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosLineasInvestigacionController {
  constructor(
    @repository(JuradosRepository) protected juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/lineas-investigacions', {
    responses: {
      '200': {
        description: 'Array of Jurados has many LineasInvestigacion through JuradosInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineasInvestigacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<LineasInvestigacion>,
  ): Promise<LineasInvestigacion[]> {
    return this.juradosRepository.muchosamuchosJuradosInvestigacion(id).find(filter);
  }

  @post('/jurados/{id}/lineas-investigacions', {
    responses: {
      '200': {
        description: 'create a LineasInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineasInvestigacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineasInvestigacion, {
            title: 'NewLineasInvestigacionInJurados',
            exclude: ['id'],
          }),
        },
      },
    }) lineasInvestigacion: Omit<LineasInvestigacion, 'id'>,
  ): Promise<LineasInvestigacion> {
    return this.juradosRepository.muchosamuchosJuradosInvestigacion(id).create(lineasInvestigacion);
  }

  @patch('/jurados/{id}/lineas-investigacions', {
    responses: {
      '200': {
        description: 'Jurados.LineasInvestigacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineasInvestigacion, {partial: true}),
        },
      },
    })
    lineasInvestigacion: Partial<LineasInvestigacion>,
    @param.query.object('where', getWhereSchemaFor(LineasInvestigacion)) where?: Where<LineasInvestigacion>,
  ): Promise<Count> {
    return this.juradosRepository.muchosamuchosJuradosInvestigacion(id).patch(lineasInvestigacion, where);
  }

  @del('/jurados/{id}/lineas-investigacions', {
    responses: {
      '200': {
        description: 'Jurados.LineasInvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(LineasInvestigacion)) where?: Where<LineasInvestigacion>,
  ): Promise<Count> {
    return this.juradosRepository.muchosamuchosJuradosInvestigacion(id).delete(where);
  }
}
