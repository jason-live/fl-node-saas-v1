class AddUserDto {
  /** 用户名
   * @type {string}
   * @memberof addUserDto
   */
  username: string = '';

  /**
   * 手机号
   * @type {string}
   * @memberof addUserDto
   */
  mobile: string = '';

  /**
   * 密码
   * @type {string}
   * @memberof addUserDto
   */
  password: string = '';

  /**
   * 邮箱
   * @type {string}
   * @memberof AddUserDto
   */
  email?: string = '';

  /**
   * 校验规则
   * @static
   * @memberof AddUserDto
   */
  static rule = {
    username: 'string',
    mobile: {
      type: 'string',
      max: 11,
      min: 11,
      trim: true,
    },
    password: 'string',
    email: 'email?',
  };
}

/**
 * 更新用户
 * @class UpdateUserDto
 */
class UpdateUserDto {
  /**
   * 用户名
   * @type {string}
   * @memberof UpdateUserDto
   */
  username: string = '';

  /**
   * 邮箱
   * @type {string}
   * @memberof UpdateUserDto
   */
  email: string = '';

  /**
   * 校验规则
   * @static
   * @type {object}
   * @memberof UpdateUserDto
   */
  static rule: object = {
    username: 'string?',
    email: 'email?',
  };
}

class UpdateUserDisableDto {

  /**
   * 状态
   * @type {number}
   * @memberof UpdateUserDisableDto
   */
  is_disabled: number = 0;

  /**
   * 参数校验
   * @static
   * @type {object}
   * @memberof UpdateUserDisableDto
   */
  static rule: object = {
    is_disabled: [ 0, 1 ],
  };
}

export {
  AddUserDto,
  UpdateUserDto,
  UpdateUserDisableDto,
};
