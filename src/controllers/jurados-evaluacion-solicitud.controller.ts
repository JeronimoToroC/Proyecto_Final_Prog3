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
  EvaluacionSolicitud,
} from '../models';
import {JuradosRepository} from '../repositories';

export class JuradosEvaluacionSolicitudController {
  constructor(
    @repository(JuradosRepository) protected juradosRepository: JuradosRepository,
  ) { }

  @get('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Array of Jurados has many EvaluacionSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EvaluacionSolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud[]> {
    return this.juradosRepository.tieneMuchosEvaluacionSolicitud(id).find(filter);
  }

  @post('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Jurados model instance',
        content: {'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {
            title: 'NewEvaluacionSolicitudInJurados',
            exclude: ['id'],
            optional: ['juradosId']
          }),
        },
      },
    }) evaluacionSolicitud: Omit<EvaluacionSolicitud, 'id'>,
  ): Promise<EvaluacionSolicitud> {
    return this.juradosRepository.tieneMuchosEvaluacionSolicitud(id).create(evaluacionSolicitud);
  }

  @patch('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Jurados.EvaluacionSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: Partial<EvaluacionSolicitud>,
    @param.query.object('where', getWhereSchemaFor(EvaluacionSolicitud)) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.juradosRepository.tieneMuchosEvaluacionSolicitud(id).patch(evaluacionSolicitud, where);
  }

  @del('/jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Jurados.EvaluacionSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EvaluacionSolicitud)) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.juradosRepository.tieneMuchosEvaluacionSolicitud(id).delete(where);
  }
}
