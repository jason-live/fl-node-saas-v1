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
   * 登出失败
   * @static
   * @memberof AccountError
   */
  static SIGNOUT_ERROR = {
    logicno: 10202,
    message: 'signOut_error',
    des: '登出失败',
  };

  /**
   * 账号不存在
   * @static
   * @memberof AccountError
   */
  static ACCOUNT_EMPTY_ERROR = {
    logicno: 10203,
    message: 'account_empty_error',
    des: '账号不存在',
  };

  /**
   * 账号已存在
   * @static
   * @memberof AccountError
   */
  static ACCOUNT_UNEMPTY_ERROR = {
    logicno: 10204,
    message: 'account_unempty_error',
    des: '账号已存在',
  };
}

export default AccountError;
