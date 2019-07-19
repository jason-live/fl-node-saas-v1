class UserError {
  /**
   * 最小值
   * @static
   * @memberof UserError
   */
  static minScope = 10221;

  /**
   * 最大值
   * @static
   * @memberof UserError
   */
  static maxScope = 10240;
  /**
   * 用户不存在
   * @static
   * @memberof UserError
   */
  static USER_EMPTY_ERROR = {
    logicno: 10221,
    message: 'user_empty_error',
    des: '用户不存在',
  };

  /**
   * 用户已存在
   * @static
   * @memberof UserError
   */
  static USER_UNEMPTY_ERROR = {
    logicno: 10222,
    message: 'user_unempty_error',
    des: '用户已存在',
  };
}

export default UserError;
