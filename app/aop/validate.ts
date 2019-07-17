import { WciDurianInterceptor } from 'wci-durian';
import { CommonError } from '../err/oper'

class ValidateRequestBody extends WciDurianInterceptor {
  async handleInterceptor(ctx: any, _next: any, wapper: any): Promise<any> {
    try {
      await ctx.validate(wapper, ctx.request.body);
    } catch (error) {
      ctx.throw({
        ...CommonError.BODY_PARAMS_ERROR,
        data: error.errors,
      });
    }
  }
}

export default ValidateRequestBody;
