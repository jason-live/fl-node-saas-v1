import { Controller } from 'egg';
import { ControllerMapping, Post, RequestBody } from 'wci-durian';
import { Validate, Passport } from '../../aop';
import { SignUpDto, SignInDto, SignOutDto, ChangePasswordDto } from '../../dto/oper/account';

/**
 * 账号相关
 * @class Account
 * @extends {Controller}
 */
@ControllerMapping('/oper/account')
class Account extends Controller {
  /**
   * 注册
   * @param {SignUpDto} signUpDto
   * @returns {Promise<any>}
   * @memberof Account
   */
  @Post('/sign-up')
  @Validate(SignUpDto)
  public async signUp(@RequestBody('body') signUpDto: SignUpDto): Promise<any> {
    return await this.ctx.service.oper.account.signUp(signUpDto);
  }

  /**
   * 登陆
   * @param {SignInDto} signInDto
   * @returns {Promise<any>}
   * @memberof Account
   */
  @Post('/sign-in')
  @Validate(SignInDto)
  public async signIn(@RequestBody('body') signInDto: SignInDto): Promise<any> {
    return await this.ctx.service.oper.account.signIn(signInDto);
  }

  /**
   * 登出
   * @param {SignOutDto} signOutDto
   * @returns {Promise<any>}
   * @memberof Account
   */
  @Post('/sign-out')
  @Validate(SignOutDto)
  @Passport()
  public async signOut(@RequestBody('body') signOutDto: SignOutDto): Promise<any> {
    return await this.ctx.service.oper.account.signOut(signOutDto);
  }

  /**
   * 修改密码
   * @param {ChangePasswordDto} changePasswordDto
   * @returns
   * @memberof Account
   */
  @Post('/change-password')
  @Validate(ChangePasswordDto)
  @Passport()
  public async changePassword(@RequestBody('body') changePasswordDto: ChangePasswordDto) {
    const account = await this.ctx.helper.jwt.getPassportJwtAccount(this.ctx);
    return await this.ctx.service.oper.account.changePassword(changePasswordDto, account);
  }
}

export default Account;
