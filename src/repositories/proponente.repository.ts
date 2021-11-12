import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, TipoVinculacion, Solicitud, SolicitudesProponentes} from '../models';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';
import {SolicitudesProponentesRepository} from './solicitudes-proponentes.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly perteneceTipoVinculacion: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  public readonly solicituds: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          SolicitudesProponentes,
          typeof Proponente.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>, @repository.getter('SolicitudesProponentesRepository') protected solicitudesProponentesRepositoryGetter: Getter<SolicitudesProponentesRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Proponente, dataSource);
    this.solicituds = this.createHasManyThroughRepositoryFactoryFor('solicituds', solicitudRepositoryGetter, solicitudesProponentesRepositoryGetter,);
    this.perteneceTipoVinculacion = this.createBelongsToAccessorFor('perteneceTipoVinculacion', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('perteneceTipoVinculacion', this.perteneceTipoVinculacion.inclusionResolver);
  }
}
