import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 启动
  config.cluster = {
    listen: {
      port: 7002,
      hostname: '127.0.0.1',
    },
  };

  // mysql
  config.mysql = {
    // 单数据库信息配置
    clients: {
      fl_saas: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123321',
        database: 'fl_saas',
      },
      fl_saas_oper: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123321',
        database: 'fl_saas_oper',
      },
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // cors
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // security
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false,
    },
    domainWhiteList: [ 'http://127.0.0.1:8032', 'http://localhost:8051' ],
  };

  return config;
};
