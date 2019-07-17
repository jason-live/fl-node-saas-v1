import { WciDurianInterceptor } from 'wci-durian';
import { AccountError } from '../err/oper';
import Database from '../db/database';
import Schema from '../db/schema';

/**
 * 认证
 * @class PassportIct
 * @extends {WciDurianInterceptor}
 */
class PassportIct extends WciDurianInterceptor {
  async handleInterceptor(ctx: any) {
    let payload: any;
    try {
      // 解析 payload
      payload = await ctx.helper.jwt.verifyPassportJwt(ctx);
      // 获取用户信息
      const user = ctx.app.mysql.get(Database.FL_SAAS_OPER).get(Schema.FSO_USER, {
        id: payload._id,
      });
      // 验证用户
      if (!user) {
        ctx.throw(AccountError.JWT_ERROR);
      }
    } catch (error) {
      // JWT伪装异常
      if (error.name === 'JsonWebTokenError') {
        ctx.throw(AccountError.JWT_ERROR);
      }
      // JWT未生效异常
      if (error.name === 'NotBeforeError') {
        ctx.throw(AccountError.JWT_INVALID_ERROR);
      }
      // JWT 失效异常
      if (error.name === 'TokenExpiredError') {
        ctx.throw(AccountError.JWT_TIMEOUT_ERROR);
      }
    }
    return payload;
  }
}

export default PassportIct;
