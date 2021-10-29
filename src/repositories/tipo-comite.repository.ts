import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoComite, TipoComiteRelations, Solicitud, ComiteSolicitud} from '../models';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {SolicitudRepository} from './solicitud.repository';

export class TipoComiteRepository extends DefaultCrudRepository<
  TipoComite,
  typeof TipoComite.prototype.id,
  TipoComiteRelations
> {

  public readonly tieneComiteSolicitud: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          ComiteSolicitud,
          typeof TipoComite.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(TipoComite, dataSource);
    this.tieneComiteSolicitud = this.createHasManyThroughRepositoryFactoryFor('tieneComiteSolicitud', solicitudRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tieneComiteSolicitud', this.tieneComiteSolicitud.inclusionResolver);
  }
}
