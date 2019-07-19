import { WciDurianInterceptor } from 'wci-durian';
import { PassportError } from '../err';
import { JwtException } from '../exception';
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
      const user = ctx.app.mysql.get(Database.FL_SAAS).get(Schema.FSO_USER, {
        id: payload._id,
      });
      // 验证用户
      if (!user) {
        ctx.throw(PassportError.JWT_ERROR);
      }
    } catch (error) {
      // JWT伪装异常
      if (error.name === JwtException.JsonWebTokenError) {
        ctx.throw(PassportError.JWT_ERROR);
      }
      // JWT未生效异常
      if (error.name === JwtException.NotBeforeError) {
        ctx.throw(PassportError.JWT_INVALID_ERROR);
      }
      // JWT 失效异常
      if (error.name === JwtException.TokenExpiredError) {
        ctx.throw(PassportError.JWT_TIMEOUT_ERROR);
      }
    }
    return payload;
  }
}

export default PassportIct;
