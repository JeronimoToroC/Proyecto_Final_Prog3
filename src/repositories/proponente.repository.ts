import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, TipoVinculacion, Solicitud, Roles, FotoUsers} from '../models';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';
import {SolicitudRepository} from './solicitud.repository';
import {RolesRepository} from './roles.repository';
import {FotoUsersRepository} from './foto-users.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly perteneceTipoVinculacion: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Proponente.prototype.id>;

  public readonly roles: BelongsToAccessor<Roles, typeof Proponente.prototype.id>;

  public readonly fotoUsers: HasManyRepositoryFactory<FotoUsers, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>, @repository.getter('FotoUsersRepository') protected fotoUsersRepositoryGetter: Getter<FotoUsersRepository>,
  ) {
    super(Proponente, dataSource);
    this.fotoUsers = this.createHasManyRepositoryFactoryFor('fotoUsers', fotoUsersRepositoryGetter,);
    this.registerInclusionResolver('fotoUsers', this.fotoUsers.inclusionResolver);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.perteneceTipoVinculacion = this.createBelongsToAccessorFor('perteneceTipoVinculacion', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('perteneceTipoVinculacion', this.perteneceTipoVinculacion.inclusionResolver);
  }
}
