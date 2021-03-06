// This file is created by egg-ts-helper@1.25.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportException from '../../../app/middleware/exception';
import ExportLoggerReq from '../../../app/middleware/logger_req';
import ExportLoggerRes from '../../../app/middleware/logger_res';
import ExportResponse from '../../../app/middleware/response';

declare module 'egg' {
  interface IMiddleware {
    exception: typeof ExportException;
    loggerReq: typeof ExportLoggerReq;
    loggerRes: typeof ExportLoggerRes;
    response: typeof ExportResponse;
  }
}
