import { Service } from 'egg';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import * as moment from 'moment';
import { sign } from 'jsonwebtoken';
import { SignUpDto, SignInDto } from '../../dto/oper/passport';
import Database from '../../db/database';
import Schema from '../../db/schema';
import AccountEntity from '../../entity/oper/account';
import UserEntity from '../../entity/oper/user';

/**
 * 账号相关
 * @class Account
 * @extends {Service}
 */
class Account extends Service {

  /**
   * 数据库链接
   * @private
   * @memberof Account
   */
  private connection = this.app.mysql.get(Database.FL_SAAS_OPER);

  /**
   * 用户注册
   * @param {SignUpDto} signUpDto
   * @returns
   * @memberof Account
   */
  public async signUp(signUpDto: SignUpDto) {
    const result = await this.connection.beginTransactionScope(async conn => {
      // 添加用户
      const userId = `${moment().format('x')}${this.ctx.helper.random.randomNumber(3)}`;
      await conn.insert(Schema.FSO_USER, {
        username: signUpDto.username,
        mobile: signUpDto.account,
        id: userId,
      });
      // 添加账号
      const accountId = `${moment().format('x')}${this.ctx.helper.random.randomNumber(3)}`;
      await conn.insert(Schema.FSO_ACCOUNT, {
        account: signUpDto.account,
        password: hashSync(signUpDto.password, genSaltSync(10)),
        id: accountId,
        user_id: userId,
      });
      return await conn.get(Schema.FSO_USER, { id: userId });
    }, this.ctx);
    return result;
  }

  /**
   * 用户登陆
   * @param {SignInDto} signInDto
   * @returns
   * @memberof Account
   */
  public async signIn(signInDto: SignInDto) {
    // 查询账号是否存在
    const account: AccountEntity = await this.connection.get(Schema.FSO_ACCOUNT, {
      account: signInDto.account,
    });
    if (!account) {
      this.ctx.throw('用户名密码错误');
    }
    // 校验密码是否正确
    const isMatch = compareSync(signInDto.password, account.password || '');
    if (!isMatch) {
      this.ctx.throw('用户名密码错误');
    }
    // 查询用户
    const user: UserEntity = await this.connection.get(Schema.FSO_USER, {
      id: account.user_id,
    });
    // 生成jwt
    const token = sign({ user_id: user.id }, 'mb5FMCSwdu7BxGy4');
    this.ctx.cookies.set('jwt', token, {
      httpOnly: true,
      signed: false,
      encrypt: true,
    });
    return user;
  }
}

export default Account;
