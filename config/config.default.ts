import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560580559116_7437';

  // add your egg config in here
  config.middleware = [ 'loggerReq', 'response', 'exception', 'loggerRes' ];

  // cors
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
