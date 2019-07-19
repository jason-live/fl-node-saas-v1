import { Service } from 'egg';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { SignUpDto, SignInDto, SignOutDto, ChangePasswordDto } from '../../dto/oper/account';
import Database from '../../db/database';
import Schema from '../../db/schema';
import AccountEntity from '../../entity/oper/account';
import { AccountError, CommonError } from '../../err';
import { DbException } from '../../exception';

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
  private connection = this.app.mysql.get(Database.FL_SAAS);

  /**
   * 用户注册
   * @param {SignUpDto} signUpDto
   * @returns
   * @memberof Account
   */
  public async signUp(signUpDto: SignUpDto) {
    try {
      return await this.connection.beginTransactionScope(async conn => {
        // 添加用户
        const userInsert = await conn.insert(Schema.FSO_USER, {
          username: signUpDto.username,
          mobile: signUpDto.account,
        });
        await conn.insert(Schema.FSO_ACCOUNT, {
          account: signUpDto.account,
          password: hashSync(signUpDto.password, genSaltSync(10)),
          user_id: userInsert.insertId,
        });
        return {
          account: signUpDto.account,
        };
      }, this.ctx);
    } catch (error) {
      if (error.errno === DbException.erDupEntryError) {
        this.ctx.throw(AccountError.ACCOUNT_UNEMPTY_ERROR);
        return;
      }
      this.ctx.throw(CommonError.DATABASE_ERROR);
    }
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
    // 生成jwt
    const token = await this.ctx.helper.jwt.initPassportJwt(account);
    // 添加至 cookie
    await this.ctx.cookies.set(this.ctx.helper.jwt.JWT_NAME, token, {
      httpOnly: true,
      signed: false,
      encrypt: false,
    });
    return {
      account: account.account,
    };
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
    return {
      account: account.account,
    };
  }

  /**
   * 修改密码
   * @param {ChangePasswordDto} changePasswordDto
   * @param {string} accountId
   * @memberof Account
   */
  public async changePassword(changePasswordDto: ChangePasswordDto, account: string) {
    this.ctx.logger.info(account);
    // 查询账号是否存在
    const accountResult: AccountEntity = await this.connection.get(Schema.FSO_ACCOUNT, {
      account,
    });
    if (!accountResult) {
      this.ctx.throw(AccountError.ACCOUNT_PASSWORD_ERROR);
    }
    // 校验密码是否正确
    const isMatch = compareSync(changePasswordDto.oldPassword, accountResult.password);
    if (!isMatch) {
      this.ctx.throw(AccountError.ACCOUNT_PASSWORD_ERROR);
    }
    try {
      // 修改密码
      await this.connection.beginTransactionScope(async conn => {
        await conn.update(Schema.FSO_ACCOUNT, {
          id: accountResult.id,
          password: hashSync(changePasswordDto.newPassword, genSaltSync(10)),
        });
      }, this.ctx);
    } catch (error) {
      this.ctx.throw(CommonError.DATABASE_ERROR);
    }
    return {
      account: accountResult.account,
    };
  }
}

export default Account;
