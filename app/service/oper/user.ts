import { Service } from 'egg';
import { genSaltSync, hashSync } from 'bcrypt';
import { AddUserDto, UpdateUserDto } from '../../dto/oper/user';
import Database from '../../db/database';
import Schema from '../../db/schema';
import { CommonError, AccountError } from '../../err';
import { DbException } from '../../exception';
import { UserEnum } from '../../enum';
import UserEntity from '../../entity/oper/user';

class User extends Service {

  /**
   * 数据库链接
   * @private
   * @memberof User
   */
  private connection = this.app.mysql.get(Database.FL_SAAS);

  /**
   * 新增用户
   * @param {AddUserDto} addUserDto
   * @returns
   * @memberof User
   */
  public async addUser(addUserDto: AddUserDto) {
    const result = await this.connection.beginTransactionScope(async conn => {
      // 添加用户
      let userInsert;
      try {
        userInsert = await conn.insert(Schema.FSO_USER, {
          username: addUserDto.username,
          mobile: addUserDto.mobile,
          email: addUserDto.email || '' ,
        });
      } catch (error) {
        if (error.errno === DbException.erDupEntryError) {
          this.ctx.throw(AccountError.ACCOUNT_UNEMPTY_ERROR);
          return;
        }
        this.ctx.throw(CommonError.DATABASE_ERROR);
      }
      // 添加账号
      await conn.insert(Schema.FSO_ACCOUNT, {
        account: addUserDto.mobile,
        password: hashSync(addUserDto.password, genSaltSync(10)),
        user_id: userInsert.insertId,
      });
      return await conn.get(Schema.FSO_USER, { id: userInsert.insertId });
    }, this.ctx);

    return result;
  }

  /**
   * 获取用户详情
   * @param {string} userId
   * @returns
   * @memberof User
   */
  public async getUser(userId: string) {
    const user: UserEntity = await this.connection.get(Schema.FSO_USER, {
      id: userId,
    });
    return {
      ...user,
      is_disable_value: UserEnum.disabled[user.is_disabled],
    };
  }

  /**
   * 更新用户信息
   * @param {UpdateUserDto} updateUserDto
   * @memberof User
   */
  public async updateUser(updateUserDto: UpdateUserDto, userId: number) {
    await this.connection.beginTransactionScope(async conn => {
      try {
        await conn.update(Schema.FSO_USER, {
          id: userId,
          ...updateUserDto,
        });
      } catch (error) {
        this.ctx.throw(CommonError.DATABASE_ERROR);
      }
    }, this.ctx);
    const user = this.connection.get(Schema.FSO_USER, {
      id: userId,
    });
    return user;
  }
}

export default User;
