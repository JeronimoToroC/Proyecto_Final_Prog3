import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurados, JuradosRelations, EvaluacionSolicitud, UsuarioJurado, LineasInvestigacion, JuradosInvestigacion} from '../models';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';
import {UsuarioJuradoRepository} from './usuario-jurado.repository';
import {JuradosInvestigacionRepository} from './jurados-investigacion.repository';
import {LineasInvestigacionRepository} from './lineas-investigacion.repository';

export class JuradosRepository extends DefaultCrudRepository<
  Jurados,
  typeof Jurados.prototype.id,
  JuradosRelations
> {

  public readonly tieneMuchosEvaluacionSolicitud: HasManyRepositoryFactory<EvaluacionSolicitud, typeof Jurados.prototype.id>;

  public readonly tieneMuchosUsuarioJurado: HasManyRepositoryFactory<UsuarioJurado, typeof Jurados.prototype.id>;

  public readonly muchosamuchosJuradosInvestigacion: HasManyThroughRepositoryFactory<LineasInvestigacion, typeof LineasInvestigacion.prototype.id,
          JuradosInvestigacion,
          typeof Jurados.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>, @repository.getter('UsuarioJuradoRepository') protected usuarioJuradoRepositoryGetter: Getter<UsuarioJuradoRepository>, @repository.getter('JuradosInvestigacionRepository') protected juradosInvestigacionRepositoryGetter: Getter<JuradosInvestigacionRepository>, @repository.getter('LineasInvestigacionRepository') protected lineasInvestigacionRepositoryGetter: Getter<LineasInvestigacionRepository>,
  ) {
    super(Jurados, dataSource);
    this.muchosamuchosJuradosInvestigacion = this.createHasManyThroughRepositoryFactoryFor('muchosamuchosJuradosInvestigacion', lineasInvestigacionRepositoryGetter, juradosInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('muchosamuchosJuradosInvestigacion', this.muchosamuchosJuradosInvestigacion.inclusionResolver);
    this.tieneMuchosUsuarioJurado = this.createHasManyRepositoryFactoryFor('tieneMuchosUsuarioJurado', usuarioJuradoRepositoryGetter,);
    this.registerInclusionResolver('tieneMuchosUsuarioJurado', this.tieneMuchosUsuarioJurado.inclusionResolver);
    this.tieneMuchosEvaluacionSolicitud = this.createHasManyRepositoryFactoryFor('tieneMuchosEvaluacionSolicitud', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tieneMuchosEvaluacionSolicitud', this.tieneMuchosEvaluacionSolicitud.inclusionResolver);
  }
}
