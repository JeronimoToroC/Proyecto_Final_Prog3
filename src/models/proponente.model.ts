import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {FotoUsers} from './foto-users.model';
import {Roles} from './roles.model';
import {Solicitud} from './solicitud.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

const URLBASE = "http://localhost:3001"

@model()
export class Proponente extends Entity {
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

  @belongsTo(() => TipoVinculacion, {name: 'perteneceTipoVinculacion'})
  tipoVinculacionId: number;

  @hasMany(() => Solicitud, {keyTo: 'proponenteId'})
  solicituds: Solicitud[];

  @belongsTo(() => Roles, {name: 'roles'})
  rolesId: string;

  @hasMany(() => FotoUsers, {keyTo: 'proponenteId'})
  fotoUsers: FotoUsers[];

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
