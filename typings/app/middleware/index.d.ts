// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLoggerReq from '../../../app/middleware/logger_req';
import ExportLoggerRes from '../../../app/middleware/logger_res';
import ExportResponse from '../../../app/middleware/response';

declare module 'egg' {
  interface IMiddleware {
    loggerReq: typeof ExportLoggerReq;
    loggerRes: typeof ExportLoggerRes;
    response: typeof ExportResponse;
  }
}
