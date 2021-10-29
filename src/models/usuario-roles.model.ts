import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioRoles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  @property({
    type: 'number',
  })
  rolesId?: number;

  constructor(data?: Partial<UsuarioRoles>) {
    super(data);
  }
}

export interface UsuarioRolesRelations {
  // describe navigational properties here
}

export type UsuarioRolesWithRelations = UsuarioRoles & UsuarioRolesRelations;
