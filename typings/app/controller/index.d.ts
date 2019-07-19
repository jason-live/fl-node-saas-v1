// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOperAccount from '../../../app/controller/oper/account';
import ExportOperUser from '../../../app/controller/oper/user';

declare module 'egg' {
  interface IController {
    oper: {
      account: ExportOperAccount;
      user: ExportOperUser;
    }
  }
}
