import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {NotificarJurado, Proponente, Recordatorios, Solicitud, SolicitudRelations} from '../models';
import {NotificarJuradoRepository} from './notificar-jurado.repository';
import {ProponenteRepository} from './proponente.repository';
import {RecordatoriosRepository} from './recordatorios.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly tienemuchosRecordatorios: HasManyRepositoryFactory<Recordatorios, typeof Solicitud.prototype.id>;

  public readonly proponente: BelongsToAccessor<Proponente, typeof Solicitud.prototype.id>;

  public readonly notificarJurados: HasManyRepositoryFactory<NotificarJurado, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RecordatoriosRepository') protected recordatoriosRepositoryGetter: Getter<RecordatoriosRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('NotificarJuradoRepository') protected notificarJuradoRepositoryGetter: Getter<NotificarJuradoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.notificarJurados = this.createHasManyRepositoryFactoryFor('notificarJurados', notificarJuradoRepositoryGetter,);
    this.registerInclusionResolver('notificarJurados', this.notificarJurados.inclusionResolver);
    this.proponente = this.createBelongsToAccessorFor('proponente', proponenteRepositoryGetter,);
    this.tienemuchosRecordatorios = this.createHasManyRepositoryFactoryFor('tienemuchosRecordatorios', recordatoriosRepositoryGetter,);
    this.registerInclusionResolver('tienemuchosRecordatorios', this.tienemuchosRecordatorios.inclusionResolver);
  }
}
