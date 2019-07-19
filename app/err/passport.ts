class PassportError {
  /**
   * 最小值
   * @static
   * @memberof PassportError
   */
  static minScope = 10101;

  /**
   * 最大值
   * @static
   * @memberof PassportError
   */
  static maxScope = 10120;

  /**
   * 认证信息超时
   * @static
   * @memberof PassportError
   */
  static JWT_TIMEOUT_ERROR = {
    logicno: 10101,
    message: 'jwt_timeout_error',
    des: '认证信息超时',
  };

  /**
   * 认证信息未生效
   * @static
   * @memberof PassportError
   */
  static JWT_INVALID_ERROR = {
    logicno: 10102,
    message: 'jwt_invalid_error',
    des: '认证信息未生效',
  };

  /**
   * 认证信息伪装
   * @static
   * @memberof PassportError
   */
  static JWT_ERROR = {
    logicno: 10103,
    message: 'jwt_error',
    des: '认证信息伪装',
  };
}

export default PassportError;
