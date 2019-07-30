import { Controller } from 'egg';
import { ControllerMapping, Post, RequestBody, Put, RequestQuery, Get, RequestPath } from 'wci-durian';
import { Validate, Passport } from '../../aop';
import { AddUserDto, UpdateUserDto, UpdateUserDisableDto } from '../../dto/oper/user';

/**
 * 用户相关
 * @class User
 * @extends {Controller}
 */
@ControllerMapping('/oper/user')
class User extends Controller {
  /**
   * 新增用户
   * @param {SignUpDto} signUpDto
   * @returns {Promise<any>}
   * @memberof User
   */
  @Post('')
  @Validate(AddUserDto)
  public async addUser(@RequestBody('body') addUserDto: AddUserDto): Promise<any> {
    return await this.ctx.service.oper.user.addUser(addUserDto);
  }

  /**
   * 修改用户
   * @param {UpdateUserDto} updateUserDto
   * @returns {Promise<any>}
   * @memberof User
   */
  @Put('/:id')
  @Validate(UpdateUserDto)
  @Passport()
  public async updateUser(
    @RequestBody('body') updateUserDto: UpdateUserDto,
    @RequestPath({ value: 'id', require: true }) id: number,
  ): Promise<any> {
    return await this.ctx.service.oper.user.updateUser(updateUserDto, id);
  }

  /**
   * 查询用户列表（分页）
   * @param {number} pageNum
   * @param {number} pageSize
   * @returns
   * @memberof User
   */
  @Get('')
  @Passport()
  public async getUserListPageable(
    @RequestQuery({ value: 'pageNum', require: true }) pageNum: number,
    @RequestQuery({ value: 'pageSize', require: true }) pageSize: number,
  ) {
    return await this.ctx.service.oper.user.getUserListPageable(pageNum, pageSize);
  }

  /**
   * 查询用户详情
   * @param {number} id
   * @returns
   * @memberof User
   */
  @Get('/:id')
  @Passport()
  public async getUser(
    @RequestPath({ value: 'id', require: true }) id: number,
  ) {
    return await this.ctx.service.oper.user.getUser(id);
  }

  /**
   * 查询当前用户信息
   * @returns
   * @memberof User
   */
  @Get('/current-user')
  @Passport()
  public async getCurrentUser() {
    const userId = await this.ctx.helper.jwt.getPassportJwtUser(this.ctx);
    return await this.ctx.service.oper.user.getUser(userId);
  }

  /**
   * 设置用户启用|禁用
   * @param {UpdateUserDisableDto} updateUserDisableDto
   * @returns {Promise<any>}
   * @memberof User
   */
  @Put('/:id/disable')
  @Passport()
  public async updateUserDisabled(
    @RequestPath({ value: 'id', require: true }) id: number,
    @RequestBody('body') updateUserDisableDto: UpdateUserDisableDto,
  ): Promise<any> {
    return await this.ctx.service.oper.user.updateUserDisabled(updateUserDisableDto, id);
  }
}

export default User;
