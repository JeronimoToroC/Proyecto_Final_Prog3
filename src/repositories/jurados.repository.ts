import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {FotoUsers, Jurados, JuradosInvestigacion, JuradosRelations, LineasInvestigacion, NotificarJurado, Roles, UsuarioJurado, RecordatorioJurado} from '../models';
import {FotoUsersRepository} from './foto-users.repository';
import {JuradosInvestigacionRepository} from './jurados-investigacion.repository';
import {LineasInvestigacionRepository} from './lineas-investigacion.repository';
import {NotificarJuradoRepository} from './notificar-jurado.repository';
import {RolesRepository} from './roles.repository';
import {UsuarioJuradoRepository} from './usuario-jurado.repository';
import {RecordatorioJuradoRepository} from './recordatorio-jurado.repository';

export class JuradosRepository extends DefaultCrudRepository<
  Jurados,
  typeof Jurados.prototype.id,
  JuradosRelations
> {

  public readonly tieneMuchosUsuarioJurado: HasManyRepositoryFactory<UsuarioJurado, typeof Jurados.prototype.id>;

  public readonly muchosamuchosJuradosInvestigacion: HasManyThroughRepositoryFactory<LineasInvestigacion, typeof LineasInvestigacion.prototype.id,
    JuradosInvestigacion,
    typeof Jurados.prototype.id
  >;

  public readonly roles: BelongsToAccessor<Roles, typeof Jurados.prototype.id>;

  public readonly fotoUsers: HasManyRepositoryFactory<FotoUsers, typeof Jurados.prototype.id>;

  public readonly notificarJurados: HasManyRepositoryFactory<NotificarJurado, typeof Jurados.prototype.id>;

  public readonly recordatorioJurados: HasManyRepositoryFactory<RecordatorioJurado, typeof Jurados.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioJuradoRepository') protected usuarioJuradoRepositoryGetter: Getter<UsuarioJuradoRepository>, @repository.getter('JuradosInvestigacionRepository') protected juradosInvestigacionRepositoryGetter: Getter<JuradosInvestigacionRepository>, @repository.getter('LineasInvestigacionRepository') protected lineasInvestigacionRepositoryGetter: Getter<LineasInvestigacionRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>, @repository.getter('FotoUsersRepository') protected fotoUsersRepositoryGetter: Getter<FotoUsersRepository>, @repository.getter('NotificarJuradoRepository') protected notificarJuradoRepositoryGetter: Getter<NotificarJuradoRepository>, @repository.getter('RecordatorioJuradoRepository') protected recordatorioJuradoRepositoryGetter: Getter<RecordatorioJuradoRepository>,
  ) {
    super(Jurados, dataSource);
    this.recordatorioJurados = this.createHasManyRepositoryFactoryFor('recordatorioJurados', recordatorioJuradoRepositoryGetter,);
    this.registerInclusionResolver('recordatorioJurados', this.recordatorioJurados.inclusionResolver);
    this.notificarJurados = this.createHasManyRepositoryFactoryFor('notificarJurados', notificarJuradoRepositoryGetter,);
    this.registerInclusionResolver('notificarJurados', this.notificarJurados.inclusionResolver);
    this.fotoUsers = this.createHasManyRepositoryFactoryFor('fotoUsers', fotoUsersRepositoryGetter,);
    this.registerInclusionResolver('fotoUsers', this.fotoUsers.inclusionResolver);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.muchosamuchosJuradosInvestigacion = this.createHasManyThroughRepositoryFactoryFor('muchosamuchosJuradosInvestigacion', lineasInvestigacionRepositoryGetter, juradosInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('muchosamuchosJuradosInvestigacion', this.muchosamuchosJuradosInvestigacion.inclusionResolver);
    this.tieneMuchosUsuarioJurado = this.createHasManyRepositoryFactoryFor('tieneMuchosUsuarioJurado', usuarioJuradoRepositoryGetter,);
    this.registerInclusionResolver('tieneMuchosUsuarioJurado', this.tieneMuchosUsuarioJurado.inclusionResolver);
  }
}
