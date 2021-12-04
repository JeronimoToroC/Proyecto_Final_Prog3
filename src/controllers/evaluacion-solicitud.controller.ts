import {service} from '@loopback/core';
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
import {Keys} from '../config/keys';
import {EvaluacionSolicitud, Jurados, NotificacionCorreo} from '../models';
import {EvaluacionSolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class EvaluacionSolicitudController {
  constructor(
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/evaluacion-solicituds')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {
            title: 'NewEvaluacionSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluacionSolicitud: Omit<EvaluacionSolicitud, 'id'>,
    jurado: Omit<Jurados, 'id'>,
  ): Promise<EvaluacionSolicitud> {
    const notiticacion = new NotificacionCorreo();
    notiticacion.email = jurado.email;
    notiticacion.asunto = "Invitacion a evaluar";
    notiticacion.mensaje = `${Keys.saludo_notificaciones} ${jurado.name}<br/>${Keys.mensaje_solicitud} ${Keys.asunto_definicion_usuario} ${jurado.email}<br/>${Keys.mensaje_para_aprovar}${Keys.url_confirmar_participacion}`;
    this.servicioNotificaciones.enviarCorreo(notiticacion);
    return this.evaluacionSolicitudRepository.create(evaluacionSolicitud);
  }

  @get('/evaluacion-solicituds/count')
  @response(200, {
    description: 'EvaluacionSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.count(where);
  }

  @get('/evaluacion-solicituds')
  @response(200, {
    description: 'Array of EvaluacionSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EvaluacionSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EvaluacionSolicitud) filter?: Filter<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud[]> {
    return this.evaluacionSolicitudRepository.find(filter);
  }

  @patch('/evaluacion-solicituds')
  @response(200, {
    description: 'EvaluacionSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.updateAll(evaluacionSolicitud, where);
  }

  @get('/evaluacion-solicituds/{id}')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EvaluacionSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EvaluacionSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<EvaluacionSolicitud>
  ): Promise<EvaluacionSolicitud> {
    return this.evaluacionSolicitudRepository.findById(id, filter);
  }

  @patch('/evaluacion-solicituds/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    await this.evaluacionSolicitudRepository.updateById(id, evaluacionSolicitud);
  }

  @put('/evaluacion-solicituds/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    await this.evaluacionSolicitudRepository.replaceById(id, evaluacionSolicitud);
  }

  @del('/evaluacion-solicituds/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluacionSolicitudRepository.deleteById(id);
  }
}
