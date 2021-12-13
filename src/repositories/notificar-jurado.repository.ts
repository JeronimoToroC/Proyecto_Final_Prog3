import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {NotificarJurado, NotificarJuradoRelations} from '../models';

export class NotificarJuradoRepository extends DefaultCrudRepository<
  NotificarJurado,
  typeof NotificarJurado.prototype.id,
  NotificarJuradoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(NotificarJurado, dataSource);
  }
}
