import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EvaluacionSolicitud, EvaluacionSolicitudRelations, ResultadoEvaluacion} from '../models';
import {ResultadoEvaluacionRepository} from './resultado-evaluacion.repository';

export class EvaluacionSolicitudRepository extends DefaultCrudRepository<
  EvaluacionSolicitud,
  typeof EvaluacionSolicitud.prototype.id,
  EvaluacionSolicitudRelations
> {

  public readonly tienemuchosResultadoEvaluacion: HasManyRepositoryFactory<ResultadoEvaluacion, typeof EvaluacionSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ResultadoEvaluacionRepository') protected resultadoEvaluacionRepositoryGetter: Getter<ResultadoEvaluacionRepository>,
  ) {
    super(EvaluacionSolicitud, dataSource);
    this.tienemuchosResultadoEvaluacion = this.createHasManyRepositoryFactoryFor('tienemuchosResultadoEvaluacion', resultadoEvaluacionRepositoryGetter,);
    this.registerInclusionResolver('tienemuchosResultadoEvaluacion', this.tienemuchosResultadoEvaluacion.inclusionResolver);
  }
}
