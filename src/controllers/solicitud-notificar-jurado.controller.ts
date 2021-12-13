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
  Solicitud,
  NotificarJurado,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudNotificarJuradoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many NotificarJurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NotificarJurado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<NotificarJurado>,
  ): Promise<NotificarJurado[]> {
    return this.solicitudRepository.notificarJurados(id).find(filter);
  }

  @post('/solicituds/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(NotificarJurado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarJurado, {
            title: 'NewNotificarJuradoInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) notificarJurado: Omit<NotificarJurado, 'id'>,
  ): Promise<NotificarJurado> {
    return this.solicitudRepository.notificarJurados(id).create(notificarJurado);
  }

  @patch('/solicituds/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Solicitud.NotificarJurado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarJurado, {partial: true}),
        },
      },
    })
    notificarJurado: Partial<NotificarJurado>,
    @param.query.object('where', getWhereSchemaFor(NotificarJurado)) where?: Where<NotificarJurado>,
  ): Promise<Count> {
    return this.solicitudRepository.notificarJurados(id).patch(notificarJurado, where);
  }

  @del('/solicituds/{id}/notificar-jurados', {
    responses: {
      '200': {
        description: 'Solicitud.NotificarJurado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(NotificarJurado)) where?: Where<NotificarJurado>,
  ): Promise<Count> {
    return this.solicitudRepository.notificarJurados(id).delete(where);
  }
}
