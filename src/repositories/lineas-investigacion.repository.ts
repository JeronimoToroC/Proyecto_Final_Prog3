import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {LineasInvestigacion, LineasInvestigacionRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class LineasInvestigacionRepository extends DefaultCrudRepository<
  LineasInvestigacion,
  typeof LineasInvestigacion.prototype.id,
  LineasInvestigacionRelations
> {

  public readonly tienemuchosSolicitud: HasManyRepositoryFactory<Solicitud, typeof LineasInvestigacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(LineasInvestigacion, dataSource);
    this.tienemuchosSolicitud = this.createHasManyRepositoryFactoryFor('tienemuchosSolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tienemuchosSolicitud', this.tienemuchosSolicitud.inclusionResolver);
  }
}
