import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, TipoVinculacion, Solicitud} from '../models';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly perteneceTipoVinculacion: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Proponente, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.perteneceTipoVinculacion = this.createBelongsToAccessorFor('perteneceTipoVinculacion', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('perteneceTipoVinculacion', this.perteneceTipoVinculacion.inclusionResolver);
  }
}
