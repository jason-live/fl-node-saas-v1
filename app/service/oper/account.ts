import { Service } from 'egg';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import * as moment from 'moment';
import { SignUpDto, SignInDto, SignOutDto } from '../../dto/oper/account';
import Database from '../../db/database';
import Schema from '../../db/schema';
import AccountEntity from '../../entity/oper/account';
import UserEntity from '../../entity/oper/user';
import { CommonError, AccountError } from '../../err/oper';

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
    return await this.connection.beginTransactionScope(async conn => {
      // 添加用户
      const userId = `${moment().format('x')}${this.ctx.helper.random.randomNumber(3)}`;
      try {
        await conn.insert(Schema.FSO_USER, {
          username: signUpDto.username,
          mobile: signUpDto.account,
          id: userId,
        });
      } catch (error) {
        this.ctx.throw(CommonError.DATABASE_ERROR);
      }
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
      this.ctx.throw(AccountError.ACCOUNT_PASSWORD_ERROR);
    }
    // 校验密码是否正确
    const isMatch = compareSync(signInDto.password, account.password);
    if (!isMatch) {
      this.ctx.throw(AccountError.ACCOUNT_PASSWORD_ERROR);
    }
    // 查询用户
    const user: UserEntity = await this.connection.get(Schema.FSO_USER, {
      id: account.user_id,
    });
    // 生成jwt
    const token = this.ctx.helper.jwt.initPassportJwt(user);
    // 添加至 cookie
    this.ctx.cookies.set(this.ctx.helper.jwt.JWT_NAME, token, {
      httpOnly: true,
      signed: false,
      encrypt: false,
    });
    return user;
  }

  /**
   * 用户登出
   * @param {SignOutDto} signOutDto
   * @returns
   * @memberof Account
   */
  public async signOut(signOutDto: SignOutDto) {
    // 查询账号是否存在
    const account: AccountEntity = await this.connection.get(Schema.FSO_ACCOUNT, {
      account: signOutDto.account,
    });
    if (!account) {
      this.ctx.throw(AccountError.ACCOUNT_EMPTY_ERROR);
    }
    return signOutDto;
  }
}

export default Account;
