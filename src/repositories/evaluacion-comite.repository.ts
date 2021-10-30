import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EvaluacionComite, EvaluacionComiteRelations} from '../models';

export class EvaluacionComiteRepository extends DefaultCrudRepository<
  EvaluacionComite,
  typeof EvaluacionComite.prototype.id,
  EvaluacionComiteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(EvaluacionComite, dataSource);
  }
}
