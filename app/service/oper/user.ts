import { Service } from 'egg';
import { map } from 'lodash';
import { genSaltSync, hashSync } from 'bcrypt';
import { AddUserDto, UpdateUserDto, UpdateUserDisableDto } from '../../dto/oper/user';
import Database from '../../db/database';
import Schema from '../../db/schema';
import { CommonError, AccountError, UserError } from '../../err';
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
  public async getUser(userId: number) {
    const user: UserEntity = await this.queryUser(userId);
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
    await this.queryUser(userId);
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

  /**
   * 禁用/启用用户
   * @param {number} userId
   * @param {number} disabled
   * @returns
   * @memberof User
   */
  public async updateUserDisabled(updateUserDisableDto: UpdateUserDisableDto, userId: number) {
    await this.queryUser(userId);
    await this.connection.beginTransactionScope(async conn => {
      try {
        await conn.update(Schema.FSO_USER, {
          id: userId,
          is_disabled: updateUserDisableDto.is_disabled,
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

  /**
   * 分页查询用户列表
   * @param {number} pageSize
   * @param {number} pageNum
   * @returns
   * @memberof User
   */
  public async getUserListPageable(pageNum: number = 1, pageSize: number = 10): Promise<any> {
    let results = {};
    const pageable = this.ctx.helper.pageable.pageHelper(pageNum, pageSize);
    results = {
      pageSize,
      pageNum,
      list: map(await this.connection.select(Schema.FSO_USER, {
        ...pageable,
        orders: [[ 'gmt_create', 'desc' ]],
      }), (value: any) => {
        return {
          ...value,
        };
      }),
      total: await this.connection.count(Schema.FSO_USER),
    };
    return results;
  }

  /**
   * 查询用户
   * @private
   * @param {number} userId
   * @returns
   * @memberof User
   */
  private async queryUser(userId: number) {
    const user: UserEntity = await this.connection.get(Schema.FSO_USER, {
      id: userId,
    });
    // 用户不存在
    if (!user) {
      this.ctx.throw(UserError.USER_EMPTY_ERROR);
    }
    return user;
  }
}

export default User;
