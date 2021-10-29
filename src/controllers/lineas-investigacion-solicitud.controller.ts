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
  LineasInvestigacion,
  Solicitud,
} from '../models';
import {LineasInvestigacionRepository} from '../repositories';

export class LineasInvestigacionSolicitudController {
  constructor(
    @repository(LineasInvestigacionRepository) protected lineasInvestigacionRepository: LineasInvestigacionRepository,
  ) { }

  @get('/lineas-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of LineasInvestigacion has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.lineasInvestigacionRepository.tienemuchosSolicitud(id).find(filter);
  }

  @post('/lineas-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'LineasInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof LineasInvestigacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInLineasInvestigacion',
            exclude: ['id'],
            optional: ['lineasInvestigacionId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.lineasInvestigacionRepository.tienemuchosSolicitud(id).create(solicitud);
  }

  @patch('/lineas-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'LineasInvestigacion.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.lineasInvestigacionRepository.tienemuchosSolicitud(id).patch(solicitud, where);
  }

  @del('/lineas-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'LineasInvestigacion.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.lineasInvestigacionRepository.tienemuchosSolicitud(id).delete(where);
  }
}
