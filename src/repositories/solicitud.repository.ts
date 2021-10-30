import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Recordatorios} from '../models';
import {RecordatoriosRepository} from './recordatorios.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly tienemuchosRecordatorios: HasManyRepositoryFactory<Recordatorios, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RecordatoriosRepository') protected recordatoriosRepositoryGetter: Getter<RecordatoriosRepository>,
  ) {
    super(Solicitud, dataSource);
    this.tienemuchosRecordatorios = this.createHasManyRepositoryFactoryFor('tienemuchosRecordatorios', recordatoriosRepositoryGetter,);
    this.registerInclusionResolver('tienemuchosRecordatorios', this.tienemuchosRecordatorios.inclusionResolver);
  }
}
