import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RecordatorioJurado, RecordatorioJuradoRelations} from '../models';

export class RecordatorioJuradoRepository extends DefaultCrudRepository<
  RecordatorioJurado,
  typeof RecordatorioJurado.prototype.id,
  RecordatorioJuradoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(RecordatorioJurado, dataSource);
  }
}
