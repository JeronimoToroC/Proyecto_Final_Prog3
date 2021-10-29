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
  EvaluacionSolicitud,
  ResultadoEvaluacion,
} from '../models';
import {EvaluacionSolicitudRepository} from '../repositories';

export class EvaluacionSolicitudResultadoEvaluacionController {
  constructor(
    @repository(EvaluacionSolicitudRepository) protected evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
  ) { }

  @get('/evaluacion-solicituds/{id}/resultado-evaluacions', {
    responses: {
      '200': {
        description: 'Array of EvaluacionSolicitud has many ResultadoEvaluacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ResultadoEvaluacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ResultadoEvaluacion>,
  ): Promise<ResultadoEvaluacion[]> {
    return this.evaluacionSolicitudRepository.tienemuchosResultadoEvaluacion(id).find(filter);
  }

  @post('/evaluacion-solicituds/{id}/resultado-evaluacions', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(ResultadoEvaluacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EvaluacionSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {
            title: 'NewResultadoEvaluacionInEvaluacionSolicitud',
            exclude: ['id'],
            optional: ['evaluacionSolicitudId']
          }),
        },
      },
    }) resultadoEvaluacion: Omit<ResultadoEvaluacion, 'id'>,
  ): Promise<ResultadoEvaluacion> {
    return this.evaluacionSolicitudRepository.tienemuchosResultadoEvaluacion(id).create(resultadoEvaluacion);
  }

  @patch('/evaluacion-solicituds/{id}/resultado-evaluacions', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud.ResultadoEvaluacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {partial: true}),
        },
      },
    })
    resultadoEvaluacion: Partial<ResultadoEvaluacion>,
    @param.query.object('where', getWhereSchemaFor(ResultadoEvaluacion)) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.tienemuchosResultadoEvaluacion(id).patch(resultadoEvaluacion, where);
  }

  @del('/evaluacion-solicituds/{id}/resultado-evaluacions', {
    responses: {
      '200': {
        description: 'EvaluacionSolicitud.ResultadoEvaluacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ResultadoEvaluacion)) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.tienemuchosResultadoEvaluacion(id).delete(where);
  }
}
