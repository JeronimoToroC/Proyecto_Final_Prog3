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
import {NotificacionCorreo, RecordatorioJurado} from '../models';
import {JuradosRepository, RecordatorioJuradoRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class RecordatorioJuradoController {
  constructor(
    @repository(RecordatorioJuradoRepository)
    public recordatorioJuradoRepository: RecordatorioJuradoRepository,
    @repository(JuradosRepository)
    public repositorioJurado: JuradosRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/recordatorio-jurados')
  @response(200, {
    description: 'RecordatorioJurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(RecordatorioJurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecordatorioJurado, {
            title: 'NewRecordatorioJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorioJurado: Omit<RecordatorioJurado, 'id'>,
  ): Promise<boolean> {
    try {
      let jurado = await this.repositorioJurado.findById(recordatorioJurado.juradosId);
      if (jurado) {
        const notiticacion = new NotificacionCorreo();
        notiticacion.email = jurado.email;
        notiticacion.asunto = "Recordatorio";
        notiticacion.mensaje = `${Keys.saludo_notificaciones} ${jurado.name}<br/>${Keys.mensaje_recordatorio}`;
        this.servicioNotificaciones.enviarCorreo(notiticacion);
        await this.recordatorioJuradoRepository.create(recordatorioJurado);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpErrors[400]("Excepción en la notifiación");
    }
  }

  @post('/recordatorio-jurados-queja')
  @response(200, {
    description: 'RecordatorioJurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(RecordatorioJurado)}},
  })
  async createqueja(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecordatorioJurado, {
            title: 'NewRecordatorioJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorioJurado: Omit<RecordatorioJurado, 'id'>,
  ): Promise<boolean> {
    try {
      let jurado = await this.repositorioJurado.findById(recordatorioJurado.juradosId);
      if (jurado) {
        const notiticacion = new NotificacionCorreo();
        notiticacion.email = jurado.email;
        notiticacion.asunto = "Queja";
        notiticacion.mensaje = `${Keys.saludo_notificaciones} ${jurado.name}<br/>${Keys.arg_resumen}${recordatorioJurado.resumen}<br/>${Keys.arg_mensaje_email_fechaRes}${recordatorioJurado.fecha}`;
        this.servicioNotificaciones.enviarCorreo(notiticacion);

        await this.recordatorioJuradoRepository.createqueja(recordatorioJurado);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpErrors[400]("Excepción en la notifiación");
    }
  }

  @get('/recordatorio-jurados/count')
  @response(200, {
    description: 'RecordatorioJurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RecordatorioJurado) where?: Where<RecordatorioJurado>,
  ): Promise<Count> {
    return this.recordatorioJuradoRepository.count(where);
  }

  @get('/recordatorio-jurados')
  @response(200, {
    description: 'Array of RecordatorioJurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RecordatorioJurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RecordatorioJurado) filter?: Filter<RecordatorioJurado>,
  ): Promise<RecordatorioJurado[]> {
    return this.recordatorioJuradoRepository.find(filter);
  }

  @patch('/recordatorio-jurados')
  @response(200, {
    description: 'RecordatorioJurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecordatorioJurado, {partial: true}),
        },
      },
    })
    recordatorioJurado: RecordatorioJurado,
    @param.where(RecordatorioJurado) where?: Where<RecordatorioJurado>,
  ): Promise<Count> {
    return this.recordatorioJuradoRepository.updateAll(recordatorioJurado, where);
  }

  @get('/recordatorio-jurados/{id}')
  @response(200, {
    description: 'RecordatorioJurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RecordatorioJurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RecordatorioJurado, {exclude: 'where'}) filter?: FilterExcludingWhere<RecordatorioJurado>
  ): Promise<RecordatorioJurado> {
    return this.recordatorioJuradoRepository.findById(id, filter);
  }

  @patch('/recordatorio-jurados/{id}')
  @response(204, {
    description: 'RecordatorioJurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecordatorioJurado, {partial: true}),
        },
      },
    })
    recordatorioJurado: RecordatorioJurado,
  ): Promise<void> {
    await this.recordatorioJuradoRepository.updateById(id, recordatorioJurado);
  }

  @put('/recordatorio-jurados/{id}')
  @response(204, {
    description: 'RecordatorioJurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recordatorioJurado: RecordatorioJurado,
  ): Promise<void> {
    await this.recordatorioJuradoRepository.replaceById(id, recordatorioJurado);
  }

  @del('/recordatorio-jurados/{id}')
  @response(204, {
    description: 'RecordatorioJurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordatorioJuradoRepository.deleteById(id);
  }
}
