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
  Recordatorios,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudRecordatoriosController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Recordatorios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recordatorios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Recordatorios>,
  ): Promise<Recordatorios[]> {
    return this.solicitudRepository.tienemuchosRecordatorios(id).find(filter);
  }

  @post('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recordatorios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorios, {
            title: 'NewRecordatoriosInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) recordatorios: Omit<Recordatorios, 'id'>,
  ): Promise<Recordatorios> {
    return this.solicitudRepository.tienemuchosRecordatorios(id).create(recordatorios);
  }

  @patch('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Solicitud.Recordatorios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorios, {partial: true}),
        },
      },
    })
    recordatorios: Partial<Recordatorios>,
    @param.query.object('where', getWhereSchemaFor(Recordatorios)) where?: Where<Recordatorios>,
  ): Promise<Count> {
    return this.solicitudRepository.tienemuchosRecordatorios(id).patch(recordatorios, where);
  }

  @del('/solicituds/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Solicitud.Recordatorios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Recordatorios)) where?: Where<Recordatorios>,
  ): Promise<Count> {
    return this.solicitudRepository.tienemuchosRecordatorios(id).delete(where);
  }
}
