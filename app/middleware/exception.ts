import { Context } from 'egg';

function Middleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      ctx.logger.error(new Error(err));
      let status = err.status || 500;
      ctx.body = {
        code: status,
        msg: err.message,
        des: '服务异常',
        data: null,
      };
      if (err.logicno) {
        ctx.logger.error('-> logic_exception: %j', err);
        status = 206;
        ctx.body = {
          code: err.logicno,
          msg: err.message,
          des: err.des,
          data: null,
        };
      }
      ctx.status = status;
    }
  };
}

export default Middleware;
