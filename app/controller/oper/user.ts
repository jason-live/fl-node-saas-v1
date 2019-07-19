import { Controller } from 'egg';
import { ControllerMapping, Post, RequestBody, Put } from 'wci-durian';
import { Validate, Passport } from '../../aop';
import { AddUserDto, UpdateUserDto } from '../../dto/oper/user';

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

  @Put('')
  @Validate(UpdateUserDto)
  @Passport()
  public async updateUser(@RequestBody('body') updateUserDto: UpdateUserDto): Promise<any> {
    const userId = await this.ctx.helper.jwt.getPassportJwtUser(this.ctx);
    return await this.ctx.service.oper.user.updateUser(updateUserDto, userId);
  }
}

export default User;
