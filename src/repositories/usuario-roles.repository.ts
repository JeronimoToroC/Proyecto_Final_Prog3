import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UsuarioRoles, UsuarioRolesRelations} from '../models';

export class UsuarioRolesRepository extends DefaultCrudRepository<
  UsuarioRoles,
  typeof UsuarioRoles.prototype.id,
  UsuarioRolesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UsuarioRoles, dataSource);
  }
}
