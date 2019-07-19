import { sign, verify } from 'jsonwebtoken';
import AccountEntity from '../../entity/oper/account';

class Jwt {
  static JWT_NAME = 'jwt';
  static secret: string = 'mb5FMCSwdu7BxGy4';

  /**
   * 生成登陆认证 token
   * @static
   * @param {UserEntity} user
   * @returns
   * @memberof Jwt
   */
  static initPassportJwt(account: AccountEntity) {
    // 要生成token的主题信息
    const content = {
      _id: account.id,
      _user: account.user_id,
      _account: account.account,
      iss: 'FL_SAAS',
      sub: account.user_id,
      aud: account.user_id,
      nbf: Math.floor(Date.now() / 1000),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    };
    // 这是加密的key（密钥);
    // 生成token
    const token = sign(content, Jwt.secret);
    return token;
  }

  /**
   * 解析登陆认证 token
   * @static
   * @param {*} token
   * @returns
   * @memberof Jwt
   */
  static async verifyPassportJwt(ctx: any) {
    try {
      const token = ctx.cookies.get(Jwt.JWT_NAME, {
        signed: false,
      });
      return await verify(token, Jwt.secret);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 获取jwt用户id
   * @static
   * @param {*} token
   * @returns
   * @memberof Jwt
   */
  static async getPassportJwtUser(ctx: any) {
    try {
      const token = ctx.cookies.get(Jwt.JWT_NAME, {
        signed: false,
      });
      const payload = await verify(token, Jwt.secret);
      return payload._user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 获取jwt账号
   * @static
   * @param {*} ctx
   * @returns
   * @memberof Jwt
   */
  static async getPassportJwtAccount(ctx: any) {
    try {
      const token = ctx.cookies.get(Jwt.JWT_NAME, {
        signed: false,
      });
      const payload = await verify(token, Jwt.secret);
      return payload._account;
    } catch (error) {
      throw error;
    }
  }
}

export default Jwt;
