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
  NotificarJurado,
  EvaluacionSolicitud,
} from '../models';
import {NotificarJuradoRepository} from '../repositories';

export class NotificarJuradoEvaluacionSolicitudController {
  constructor(
    @repository(NotificarJuradoRepository) protected notificarJuradoRepository: NotificarJuradoRepository,
  ) { }

  @get('/notificar-jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'Array of NotificarJurado has many EvaluacionSolicitud',
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
    return this.notificarJuradoRepository.evaluacionSolicituds(id).find(filter);
  }

  @post('/notificar-jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'NotificarJurado model instance',
        content: {'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof NotificarJurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {
            title: 'NewEvaluacionSolicitudInNotificarJurado',
            exclude: ['id'],
            optional: ['notificarJuradoId']
          }),
        },
      },
    }) evaluacionSolicitud: Omit<EvaluacionSolicitud, 'id'>,
  ): Promise<EvaluacionSolicitud> {
    return this.notificarJuradoRepository.evaluacionSolicituds(id).create(evaluacionSolicitud);
  }

  @patch('/notificar-jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'NotificarJurado.EvaluacionSolicitud PATCH success count',
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
    return this.notificarJuradoRepository.evaluacionSolicituds(id).patch(evaluacionSolicitud, where);
  }

  @del('/notificar-jurados/{id}/evaluacion-solicituds', {
    responses: {
      '200': {
        description: 'NotificarJurado.EvaluacionSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EvaluacionSolicitud)) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.notificarJuradoRepository.evaluacionSolicituds(id).delete(where);
  }
}
