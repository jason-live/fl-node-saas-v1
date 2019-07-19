class User {
  /**
   * 主键ID
   * @type {number}
   * @memberof User
   */
  id: number;
  /**
   * 用户名
   * @type {string}
   * @memberof User
   */
  username: string;
  /**
   * 手机号
   * @type {string}
   * @memberof User
   */
  mobile: string;
  /**
   * 邮箱
   * @type {string}
   * @memberof User
   */
  email: string;
  /**
   * 是否禁用
   * @type {number}
   * @memberof User
   */
  is_disabled: number;
  /**
   * 创建时间
   * @type {string}
   * @memberof User
   */
  gmt_create: string;
  /**
   * 更新时间
   * @type {string}
   * @memberof User
   */
  gmt_modified: string;
  /**
   * 创建人
   * @type {string}
   * @memberof User
   */
  sub_create: string;
  /**
   * 更新人
   * @type {string}
   * @memberof User
   */
  sub_modified: string;
  /**
   * 删除标示
   * @type {string}
   * @memberof User
   */
  is_deleted: string;
}

export default User;
