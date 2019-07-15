
import { Context } from 'egg';

function LoggerResponse(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    ctx.logger.info('-> controller response data: %j', ctx.body);
  };
}

export default LoggerResponse;
