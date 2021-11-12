import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SolicitudesProponentes, SolicitudesProponentesRelations} from '../models';

export class SolicitudesProponentesRepository extends DefaultCrudRepository<
  SolicitudesProponentes,
  typeof SolicitudesProponentes.prototype.id,
  SolicitudesProponentesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(SolicitudesProponentes, dataSource);
  }
}
