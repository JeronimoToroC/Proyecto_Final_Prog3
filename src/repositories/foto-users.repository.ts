import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {FotoUsers, FotoUsersRelations} from '../models';

export class FotoUsersRepository extends DefaultCrudRepository<
  FotoUsers,
  typeof FotoUsers.prototype.id,
  FotoUsersRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FotoUsers, dataSource);
  }
}
