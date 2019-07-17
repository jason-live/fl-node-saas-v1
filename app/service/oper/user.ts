import { Service } from 'egg';
import * as moment from 'moment';
import { genSaltSync, hashSync } from 'bcrypt';
import { AddUserDto } from '../../dto/oper/user';
import Database from '../../db/database';
import Schema from '../../db/schema';
import { CommonError } from '../../err/oper';

class User extends Service {

  /**
   * 数据库链接
   * @private
   * @memberof User
   */
  private connection = this.app.mysql.get(Database.FL_SAAS_OPER);

  /**
   * 新增用户
   * @param {AddUserDto} addUserDto
   * @returns
   * @memberof User
   */
  public async addUser(addUserDto: AddUserDto) {
    const result = await this.connection.beginTransactionScope(async conn => {
      // 添加用户
      const userId = `${moment().format('x')}${this.ctx.helper.random.randomNumber(3)}`;
      try {
        await conn.insert(Schema.FSO_USER, {
          username: addUserDto.username,
          mobile: addUserDto.mobile,
          id: userId,
        });
      } catch (error) {
        this.ctx.throw(CommonError.DATABASE_ERROR);
      }
      // 添加账号
      const accountId = `${moment().format('x')}${this.ctx.helper.random.randomNumber(3)}`;
      await conn.insert(Schema.FSO_ACCOUNT, {
        account: addUserDto.mobile,
        password: hashSync(addUserDto.password, genSaltSync(10)),
        id: accountId,
        user_id: userId,
      });
      return await conn.get(Schema.FSO_USER, { id: userId });
    }, this.ctx);

    return result;
  }
}

export default User;
