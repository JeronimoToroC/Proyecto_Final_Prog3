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
import {Proponente} from '../models';
import {ProponenteRepository} from '../repositories';
import {AdminDePasswordsService, NotificacionesService} from '../services';


export class ProponenteController {
  constructor(
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
    @service(AdminDePasswordsService)
    public passwordService: AdminDePasswordsService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  //@authenticate("admin")
  @post('/proponentes')
  @response(200, {
    description: 'Proponente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Proponente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {
            title: 'NewProponente',
            exclude: ['id'],
          }),
        },
      },
    })
    proponente: Omit<Proponente, 'id'>,
  ): Promise<Proponente> {
    /* let password = this.passwordService.generateRandomPassword()
    const notiticacion = new NotificacionCorreo();
    notiticacion.email = proponente.email;
    notiticacion.asunto = "Registro en el sistema";
    notiticacion.mensaje = `${Keys.saludo_notificaciones} ${proponente.name}<br/>${Keys.asunto_generacion_clave} ${password} ${Keys.asunto_definicion_usuario} ${proponente.email}`;
    this.servicioNotificaciones.enviarCorreo(notiticacion);
    let cryptingPassword = this.passwordService.cryptngText(password)
    proponente.password = cryptingPassword */
    return this.proponenteRepository.create(proponente);
  }

  //@authenticate("admin")
  @get('/proponentes/count')
  @response(200, {
    description: 'Proponente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Proponente) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.proponenteRepository.count(where);
  }

  //@authenticate("admin")
  @get('/proponentes')
  @response(200, {
    description: 'Array of Proponente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Proponente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Proponente) filter?: Filter<Proponente>,
  ): Promise<Proponente[]> {
    return this.proponenteRepository.find(filter);
  }

  //@authenticate("admin")
  @patch('/proponentes')
  @response(200, {
    description: 'Proponente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Proponente,
    @param.where(Proponente) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.proponenteRepository.updateAll(proponente, where);
  }

  //@authenticate("admin")
  @get('/proponentes/{id}')
  @response(200, {
    description: 'Proponente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Proponente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Proponente, {exclude: 'where'}) filter?: FilterExcludingWhere<Proponente>
  ): Promise<Proponente> {
    return this.proponenteRepository.findById(id, filter);
  }

  //@authenticate("admin")
  @patch('/proponentes/{id}')
  @response(204, {
    description: 'Proponente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Proponente,
  ): Promise<void> {
    await this.proponenteRepository.updateById(id, proponente);
  }

  //@authenticate("admin")
  @put('/proponentes/{id}')
  @response(204, {
    description: 'Proponente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() proponente: Proponente,
  ): Promise<void> {
    await this.proponenteRepository.replaceById(id, proponente);
  }

  //@authenticate("admin")
  @del('/proponentes/{id}')
  @response(204, {
    description: 'Proponente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proponenteRepository.deleteById(id);
  }
}
