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
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Keys} from '../config/keys';
import {NotificacionCorreo, NotificarJurado} from '../models';
import {JuradosRepository, NotificarJuradoRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class NotificarJuradoController {
  constructor(
    @repository(NotificarJuradoRepository)
    public notificarJuradoRepository: NotificarJuradoRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @repository(JuradosRepository)
    public repositorioJurado: JuradosRepository
  ) { }

  @post('/notificar-jurados')
  @response(200, {
    description: 'NotificarJurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(NotificarJurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarJurado, {
            title: 'NewNotificarJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    notificarJurado: Omit<NotificarJurado, 'id'>
  ): Promise<boolean> {
    try {
      const jurado = await this.repositorioJurado.findById(notificarJurado.juradosId);
      if (jurado) {
        const notiticacion = new NotificacionCorreo();
        const idNotificacion = await this.notificarJuradoRepository.create(notificarJurado);
        notiticacion.email = jurado.email;
        notiticacion.asunto = "Invitacion a evaluar";
        notiticacion.mensaje = `${Keys.saludo_notificaciones} ${jurado.name}<br/>${Keys.mensaje_solicitud} ${jurado.email}<br/>${Keys.mensaje_para_aprovar}${Keys.url_confirmar_participacion}${idNotificacion.id}<br/>${Keys.mensaje_para_rechazar}${Keys.url_rechazar_participacion}${idNotificacion.id}<br/>${Keys.arg_mensaje_email_fechaInv}${idNotificacion.fechaInvitacion}`;
        this.servicioNotificaciones.enviarCorreo(notiticacion);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpErrors[400]("Excepción en la notifiación");
    }
  }

  @get('/notificar-jurados/count')
  @response(200, {
    description: 'NotificarJurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NotificarJurado) where?: Where<NotificarJurado>,
  ): Promise<Count> {
    return this.notificarJuradoRepository.count(where);
  }

  @get('/notificar-jurados')
  @response(200, {
    description: 'Array of NotificarJurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NotificarJurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NotificarJurado) filter?: Filter<NotificarJurado>,
  ): Promise<NotificarJurado[]> {
    return this.notificarJuradoRepository.find(filter);
  }

  @patch('/notificar-jurados')
  @response(200, {
    description: 'NotificarJurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarJurado, {partial: true}),
        },
      },
    })
    notificarJurado: NotificarJurado,
    @param.where(NotificarJurado) where?: Where<NotificarJurado>,
  ): Promise<Count> {
    return this.notificarJuradoRepository.updateAll(notificarJurado, where);
  }

  @get('/notificar-jurados/{id}')
  @response(200, {
    description: 'NotificarJurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NotificarJurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(NotificarJurado, {exclude: 'where'}) filter?: FilterExcludingWhere<NotificarJurado>
  ): Promise<NotificarJurado> {
    return this.notificarJuradoRepository.findById(id, filter);
  }

  @patch('/notificar-jurados/{id}')
  @response(204, {
    description: 'NotificarJurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificarJurado, {partial: true}),
        },
      },
    })
    notificarJurado: NotificarJurado,
  ): Promise<void> {
    await this.notificarJuradoRepository.updateById(id, notificarJurado);
  }

  @put('/notificar-jurados/{id}')
  @response(204, {
    description: 'NotificarJurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() notificarJurado: NotificarJurado,
  ): Promise<void> {
    await this.notificarJuradoRepository.replaceById(id, notificarJurado);
  }

  @del('/notificar-jurados/{id}')
  @response(204, {
    description: 'NotificarJurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.notificarJuradoRepository.deleteById(id);
  }
}
