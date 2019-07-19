class CommonError {
  /**
   * 最小值
   * @static
   * @memberof CommonError
   */
  static minScope = 10001;

  /**
   * 最大值
   * @static
   * @memberof CommonError
   */
  static maxScope = 10100;

  /**
   * 数据库异常
   * @static
   * @memberof CommonError
   */
  static DATABASE_ERROR = {
    logicno: 10010,
    message: 'database_error',
    des: '服务异常',
  };

  /**
   * 请求体参数异常
   * @static
   * @memberof CommonError
   */
  static REQUEST_BODY_PARAMS_ERROR = {
    logicno: 10011,
    message: 'request_body_params_error',
    des: '服务异常',
  };
}

export default CommonError;
