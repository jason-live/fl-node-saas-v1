// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOperAccount from '../../../app/service/oper/account';
import ExportOperUser from '../../../app/service/oper/user';

declare module 'egg' {
  interface IService {
    oper: {
      account: ExportOperAccount;
      user: ExportOperUser;
    }
  }
}
