import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';
import {FotoUsers} from './foto-users.model';
import {JuradosInvestigacion} from './jurados-investigacion.model';
import {LineasInvestigacion} from './lineas-investigacion.model';
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

  @property({
    type: 'any',
    required: true,
  })
  entity: any;

  @hasMany(() => EvaluacionSolicitud, {keyTo: 'juradosId'})
  tieneMuchosEvaluacionSolicitud: EvaluacionSolicitud[];

  @hasMany(() => UsuarioJurado, {keyTo: 'juradosId'})
  tieneMuchosUsuarioJurado: UsuarioJurado[];

  @hasMany(() => LineasInvestigacion, {through: {model: () => JuradosInvestigacion, keyFrom: 'juradosId', keyTo: 'lineasInvestigacionId'}})
  muchosamuchosJuradosInvestigacion: LineasInvestigacion[];

  @belongsTo(() => Roles, {name: 'roles'})
  rolesId: string;

  @hasMany(() => FotoUsers, {keyTo: 'proponenteId'})
  fotoUsers: FotoUsers[];

  constructor(data?: Partial<Jurados>) {
    super(data);
  }
}

export interface JuradosRelations {
  // describe navigational properties here
}

export type JuradosWithRelations = Jurados & JuradosRelations;
