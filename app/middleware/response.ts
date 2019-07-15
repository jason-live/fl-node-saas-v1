
import { Context } from 'egg';

function Middleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    if (ctx.status === 200) {
      ctx.body = {
        code: ctx.response.status,
        msg: ctx.response.message,
        des: '成功',
        data: ctx.body,
      };
    }
  };
}

export default Middleware;
