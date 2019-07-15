// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOperAccount from '../../../app/controller/oper/account';
import ExportSaasAccount from '../../../app/controller/saas/account';
import ExportSaasUser from '../../../app/controller/saas/user';

declare module 'egg' {
  interface IController {
    oper: {
      account: ExportOperAccount;
    }
    saas: {
      account: ExportSaasAccount;
      user: ExportSaasUser;
    }
  }
}
