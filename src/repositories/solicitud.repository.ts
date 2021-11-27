import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Recordatorios, Proponente} from '../models';
import {RecordatoriosRepository} from './recordatorios.repository';
import {ProponenteRepository} from './proponente.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly tienemuchosRecordatorios: HasManyRepositoryFactory<Recordatorios, typeof Solicitud.prototype.id>;

  public readonly proponente: BelongsToAccessor<Proponente, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RecordatoriosRepository') protected recordatoriosRepositoryGetter: Getter<RecordatoriosRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.proponente = this.createBelongsToAccessorFor('proponente', proponenteRepositoryGetter,);
    this.tienemuchosRecordatorios = this.createHasManyRepositoryFactoryFor('tienemuchosRecordatorios', recordatoriosRepositoryGetter,);
    this.registerInclusionResolver('tienemuchosRecordatorios', this.tienemuchosRecordatorios.inclusionResolver);
  }
}
