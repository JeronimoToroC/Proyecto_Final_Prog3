import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Facultad, Proponente, DepartamentoProponente} from '../models';
import {FacultadRepository} from './facultad.repository';
import {DepartamentoProponenteRepository} from './departamento-proponente.repository';
import {ProponenteRepository} from './proponente.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly perteneceFacultad: BelongsToAccessor<Facultad, typeof Departamento.prototype.id>;

  public readonly muchosDepartamentoProponente: HasManyThroughRepositoryFactory<Proponente, typeof Proponente.prototype.id,
          DepartamentoProponente,
          typeof Departamento.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>, @repository.getter('DepartamentoProponenteRepository') protected departamentoProponenteRepositoryGetter: Getter<DepartamentoProponenteRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>,
  ) {
    super(Departamento, dataSource);
    this.muchosDepartamentoProponente = this.createHasManyThroughRepositoryFactoryFor('muchosDepartamentoProponente', proponenteRepositoryGetter, departamentoProponenteRepositoryGetter,);
    this.registerInclusionResolver('muchosDepartamentoProponente', this.muchosDepartamentoProponente.inclusionResolver);
    this.perteneceFacultad = this.createBelongsToAccessorFor('perteneceFacultad', facultadRepositoryGetter,);
    this.registerInclusionResolver('perteneceFacultad', this.perteneceFacultad.inclusionResolver);
  }
}
