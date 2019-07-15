import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

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

  return config;
};
