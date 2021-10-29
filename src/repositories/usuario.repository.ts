import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Roles, UsuarioRoles} from '../models';
import {UsuarioRolesRepository} from './usuario-roles.repository';
import {RolesRepository} from './roles.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly muchosamuchosUsuariosRoles: HasManyThroughRepositoryFactory<Roles, typeof Roles.prototype.id,
          UsuarioRoles,
          typeof Usuario.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRolesRepository') protected usuarioRolesRepositoryGetter: Getter<UsuarioRolesRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Usuario, dataSource);
    this.muchosamuchosUsuariosRoles = this.createHasManyThroughRepositoryFactoryFor('muchosamuchosUsuariosRoles', rolesRepositoryGetter, usuarioRolesRepositoryGetter,);
    this.registerInclusionResolver('muchosamuchosUsuariosRoles', this.muchosamuchosUsuariosRoles.inclusionResolver);
  }
}
