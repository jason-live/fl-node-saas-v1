import { isEmpty } from 'lodash';
import { WciDurianInterceptor } from 'wci-durian';
import { CommonError } from '../err';

/**
 * request body 处理
 * @class ValidateRequestBody
 * @extends {WciDurianInterceptor}
 */
class ValidateRequestBody extends WciDurianInterceptor {
  async handleInterceptor(ctx: any, _next: any, wapper: any): Promise<any> {
    try {
      // 处理参数
      await this.handleBody(ctx, wapper);
      // 验证参数
      await ctx.validate(wapper.rule, ctx.request.body);
    } catch (error) {
      ctx.throw({
        ...CommonError.REQUEST_BODY_PARAMS_ERROR,
        data: error.errors,
      });
    }
  }

  /**
   * 处理 Body 参数
   * @param {*} ctx
   * @param {*} wapper
   * @memberof ValidateRequestBody
   */
  async handleBody(ctx: any, wapper: any) {
    const { body } = ctx.request;
    const keys: string[] = [];
    const dto = new wapper();
    for (const key in dto) {
      keys.push(key);
    }
    for (const key in body) {
      if ((keys.indexOf(key) < 0) || isEmpty(body[key])) {
        delete body[key];
      }
    }
  }
}

export default ValidateRequestBody;
