/**
 * 注册
 * @class SignUpDto
 */
class SignUpDto {
  /**
   * 用户名
   * @type {string}
   * @memberof SignUpDto
   */
  username: string;
  /**
   * 账号
   * @type {string}
   * @memberof SignUpDto
   */
  account: string;
  /**
   * 密码
   * @type {string}
   * @memberof SignUpDto
   */
  password: string;

  /**
   * 参数校验
   * @static
   * @type {object}
   * @memberof SignUpDto
   */
  static signUpRule: object = {
    username: 'string',
    account: 'string',
    password: 'string',
  };
}

/**
 * 登陆
 * @class SignInDto
 */
class SignInDto {
  /**
   * 账号
   * @type {string}
   * @memberof SignInDto
   */
  account: string;
  /**
   * 密码
   * @type {string}
   * @memberof SignInDto
   */
  password: string;

  /**
   * 参数校验
   * @static
   * @type {object}
   * @memberof SignInDto
   */
  static sginInRule: object = {
    account: 'string',
    password: 'string',
  };
}

/**
 * 登出
 * @class SignOutDto
 */
class SignOutDto {
/**
 * 账号
 * @type {string}
 * @memberof SignInDto
 */
  account: string;

  /**
   * 参数校验
   * @static
   * @type {object}
   * @memberof SignInDto
   */
  static sginOutRule: object = {
    account: 'string',
  };
}

export {
  SignUpDto,
  SignInDto,
  SignOutDto,
};
