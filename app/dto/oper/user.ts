class AddUserDto {
  /** 用户名
   * @type {string}
   * @memberof addUserDto
   */
  username: string;

  /**
   * 手机号
   * @type {string}
   * @memberof addUserDto
   */
  mobile: string;

  /**
   * 密码
   * @type {string}
   * @memberof addUserDto
   */
  password: string;

  /**
   * 邮箱
   * @type {string}
   * @memberof AddUserDto
   */
  email?: string;

  /**
   * 校验规则
   * @static
   * @memberof AddUserDto
   */
  static addUserRule = {
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

export {
  AddUserDto,
};
