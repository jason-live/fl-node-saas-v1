import { WciDurianInterceptor } from 'wci-durian';

class ValidateRequestBody extends WciDurianInterceptor {
  async handleInterceptor(ctx: any, _next: any, wapper: any): Promise<any> {
    try {
      await ctx.validate(wapper, ctx.request.body);
    } catch (error) {
      ctx.throw({
        logicno: 99999,
        message: error.message,
        des: error.errors,
      });
    }
  }
}

export default ValidateRequestBody;
