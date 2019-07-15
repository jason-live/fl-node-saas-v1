class User {
  /**
   * 主键ID
   * @type {number}
   * @memberof User
   */
  id?: number;
  /**
   * 用户名
   * @type {string}
   * @memberof User
   */
  username?: string;
  /**
   * 手机号
   * @type {string}
   * @memberof User
   */
  mobile?: string;
  /**
   * 邮箱
   * @type {string}
   * @memberof User
   */
  email?: string;
  /**
   * 是否禁用
   * @type {number}
   * @memberof User
   */
  disabled?: number;
  /**
   * 创建时间
   * @type {string}
   * @memberof User
   */
  create_time?: string;
  /**
   * 更新时间
   * @type {string}
   * @memberof User
   */
  update_time?: string;
  /**
   * 创建人
   * @type {string}
   * @memberof User
   */
  create_by?: string;
  /**
   * 更新人
   * @type {string}
   * @memberof User
   */
  update_by?: string;
  /**
   * 删除标示
   * @type {string}
   * @memberof User
   */
  deleted?: string;
}

export default User;
