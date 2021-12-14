import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {NotificarJurado, NotificarJuradoRelations, EvaluacionSolicitud} from '../models';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';

export class NotificarJuradoRepository extends DefaultCrudRepository<
  NotificarJurado,
  typeof NotificarJurado.prototype.id,
  NotificarJuradoRelations
> {

  public readonly evaluacionSolicituds: HasManyRepositoryFactory<EvaluacionSolicitud, typeof NotificarJurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>,
  ) {
    super(NotificarJurado, dataSource);
    this.evaluacionSolicituds = this.createHasManyRepositoryFactoryFor('evaluacionSolicituds', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionSolicituds', this.evaluacionSolicituds.inclusionResolver);
  }
}
