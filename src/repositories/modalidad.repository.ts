import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Modalidad, ModalidadRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class ModalidadRepository extends DefaultCrudRepository<
  Modalidad,
  typeof Modalidad.prototype.id,
  ModalidadRelations
> {

  public readonly tienemuchosSolicitud: HasManyRepositoryFactory<Solicitud, typeof Modalidad.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Modalidad, dataSource);
    this.tienemuchosSolicitud = this.createHasManyRepositoryFactoryFor('tienemuchosSolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tienemuchosSolicitud', this.tienemuchosSolicitud.inclusionResolver);
  }
}
