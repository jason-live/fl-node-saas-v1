class AccountError {
  /**
   * 最小值
   * @static
   * @memberof AccountError
   */
  static minScope = 10201;

  /**
   * 最大值
   * @static
   * @memberof AccountError
   */
  static maxScope = 10220;

  /**
   * 账号密码错误
   * @static
   * @memberof AccountError
   */
  static ACCOUNT_PASSWORD_ERROR = {
    logicno: 10201,
    message: 'account_password_error',
    des: '账号密码错误',
  };

  /**
   * 认证信息超时
   * @static
   * @memberof AccountError
   */
  static JWT_TIMEOUT_ERROR = {
    logicno: 10202,
    message: 'jwt_timeout_error',
    des: '认证信息超时',
  };

  /**
   * 认证信息未生效
   * @static
   * @memberof AccountError
   */
  static JWT_INVALID_ERROR = {
    logicno: 10203,
    message: 'jwt_invalid_error',
    des: '认证信息未生效',
  };

  /**
   * 认证信息伪装
   * @static
   * @memberof AccountError
   */
  static JWT_ERROR = {
    logicno: 10204,
    message: 'jwt_error',
    des: '认证信息伪装',
  };

  /**
   * 登出失败
   * @static
   * @memberof AccountError
   */
  static SIGNOUT_ERROR = {
    logicno: 10205,
    message: 'signOut_error',
    des: '登出失败',
  };

  /**
   * 账号不存在
   * @static
   * @memberof AccountError
   */
  static ACCOUNT_EMPTY_ERROR = {
    logicno: 10206,
    message: 'account_empty_error',
    des: '账号不存在',
  };
}

export default AccountError;
