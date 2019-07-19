
import { Context } from 'egg';

function LoggerRequest(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    ctx.logger.info('<=== req data: %j', ctx.request.body);
  };
}

export default LoggerRequest;
