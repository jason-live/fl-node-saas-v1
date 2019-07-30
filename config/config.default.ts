import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560580559116_7437';

  // onerror
  config.onerror = {
    accepts() {
      return 'json';
    },
    all(err, ctx) {
      ctx.logger.error('onerror', err);
      let status = err.status || 500;
      ctx.body = {
        code: status,
        msg: err.message,
        des: '服务异常',
        data: null,
      };
      if (err.logicno) {
        status = 206;
        ctx.body = {
          code: err.logicno,
          msg: err.message,
          des: err.des,
          data: err.data || null,
        };
      }
      ctx.status = status;
    },
  };

  // add your egg config in here
  config.middleware = [ 'loggerReq', 'response', 'loggerRes' ];

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
