import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';
import {FotoUsers} from './foto-users.model';
import {JuradosInvestigacion} from './jurados-investigacion.model';
import {LineasInvestigacion} from './lineas-investigacion.model';
import {NotificarJurado} from './notificar-jurado.model';
import {Roles} from './roles.model';
import {UsuarioJurado} from './usuario-jurado.model';

@model()
export class Jurados extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  document: string;

  @property({
    type: 'string',
    required: false,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  cell: string;

  @property({
    type: 'string',
  })
  foto?: string;

  @hasMany(() => EvaluacionSolicitud)
  tieneMuchosEvaluacionSolicitud: EvaluacionSolicitud[];

  @hasMany(() => UsuarioJurado)
  tieneMuchosUsuarioJurado: UsuarioJurado[];

  @hasMany(() => LineasInvestigacion, {through: {model: () => JuradosInvestigacion}})
  muchosamuchosJuradosInvestigacion: LineasInvestigacion[];

  @belongsTo(() => Roles)
  rolesId: string;

  @hasMany(() => FotoUsers)
  fotoUsers: FotoUsers[];

  @hasMany(() => NotificarJurado)
  notificarJurados: NotificarJurado[];

  @property({
    type: 'number',
  })
  entidadId?: number;

  constructor(data?: Partial<Jurados>) {
    super(data);
  }
}

export interface JuradosRelations {
  // describe navigational properties here
}

export type JuradosWithRelations = Jurados & JuradosRelations;
