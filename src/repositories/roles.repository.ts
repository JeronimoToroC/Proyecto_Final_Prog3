import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Roles, RolesRelations, Proponente, Jurados} from '../models';
import {ProponenteRepository} from './proponente.repository';
import {JuradosRepository} from './jurados.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly proponentes: HasManyRepositoryFactory<Proponente, typeof Roles.prototype.id>;

  public readonly jurados: HasManyRepositoryFactory<Jurados, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('JuradosRepository') protected juradosRepositoryGetter: Getter<JuradosRepository>,
  ) {
    super(Roles, dataSource);
    this.jurados = this.createHasManyRepositoryFactoryFor('jurados', juradosRepositoryGetter,);
    this.registerInclusionResolver('jurados', this.jurados.inclusionResolver);
    this.proponentes = this.createHasManyRepositoryFactoryFor('proponentes', proponenteRepositoryGetter,);
    this.registerInclusionResolver('proponentes', this.proponentes.inclusionResolver);
  }
}
