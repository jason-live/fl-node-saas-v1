class Account {
  /**
   * 主键ID
   * @type {number}
   * @memberof Account
   */
  id?: number;
  /**
   * 账号
   * @type {string}
   * @memberof Account
   */
  account?: string;
  /**
   * 密码（MD5加密）
   * @type {string}
   * @memberof Account
   */
  password?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof Account
   */
  create_time?: string;
  /**
   * 更新时间
   * @type {string}
   * @memberof Account
   */
  update_time?: string;
  /**
   * 创建人
   * @type {string}
   * @memberof Account
   */
  create_by?: string;
  /**
   * 更新人
   * @type {string}
   * @memberof Account
   */
  update_by?: string;
  /**
   * 删除标示
   * @type {string}
   * @memberof Account
   */
  deleted?: string;

  /**
   * 用户ID
   * @type {string}
   * @memberof Account
   */
  user_id?: string;
}

export default Account;
