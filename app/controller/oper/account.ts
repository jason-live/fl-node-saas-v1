import { Controller } from 'egg';
import { ControllerMapping, Post, RequestBody } from 'wci-durian';
import { Validate, Passport } from '../../aop';
import { SignUpDto, SignInDto, SignOutDto } from '../../dto/oper/account';

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
  @Post('/signUp')
  @Validate(SignUpDto.signUpRule)
  public async signUp(@RequestBody('body') signUpDto: SignUpDto): Promise<any> {
    return await this.ctx.service.oper.account.signUp(signUpDto);
  }

  /**
   * 登陆
   * @param {SignInDto} signInDto
   * @returns {Promise<any>}
   * @memberof Account
   */
  @Post('/signIn')
  @Validate(SignInDto.sginInRule)
  public async signIn(@RequestBody('body') signInDto: SignInDto): Promise<any> {
    return await this.ctx.service.oper.account.signIn(signInDto);
  }

  /**
   * 登出
   * @param {SignOutDto} signOutDto
   * @returns {Promise<any>}
   * @memberof Account
   */
  @Post('/signOut')
  @Validate(SignOutDto.sginOutRule)
  @Passport()
  public async signOut(@RequestBody('body') signOutDto: SignOutDto): Promise<any> {
    return await this.ctx.service.oper.account.signOut(signOutDto);
  }
}

export default Account;
