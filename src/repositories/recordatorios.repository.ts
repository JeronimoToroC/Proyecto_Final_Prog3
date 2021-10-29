import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Recordatorios, RecordatoriosRelations} from '../models';

export class RecordatoriosRepository extends DefaultCrudRepository<
  Recordatorios,
  typeof Recordatorios.prototype.id,
  RecordatoriosRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Recordatorios, dataSource);
  }
}
