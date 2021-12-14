import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Entidad, EntidadRelations, Jurados} from '../models';
import {JuradosRepository} from './jurados.repository';

export class EntidadRepository extends DefaultCrudRepository<
  Entidad,
  typeof Entidad.prototype.id,
  EntidadRelations
> {

  public readonly jurados: HasManyRepositoryFactory<Jurados, typeof Entidad.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradosRepository') protected juradosRepositoryGetter: Getter<JuradosRepository>,
  ) {
    super(Entidad, dataSource);
    this.jurados = this.createHasManyRepositoryFactoryFor('jurados', juradosRepositoryGetter,);
    this.registerInclusionResolver('jurados', this.jurados.inclusionResolver);
  }
}
