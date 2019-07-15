import { Controller } from 'egg';
import { ControllerMapping, Post, RequestBody, RequestQuery } from 'wci-durian';
import { sign } from 'jsonwebtoken';
import { Validate, Passport } from '../../aop';
import { SignUpDto } from '../../dto/oper/passport';

@ControllerMapping('/oper/account')
class OperAccount extends Controller {

  @Post('/signIn')
  @Validate({ account: 'string', passport: 'string' })
  @Passport()
  public async signIn(@RequestQuery({ value: 'name', require: true }) name: any): Promise<any> {
    console.log(name);
    const token = sign({ foo: 'bar' }, 'shhhhh');
    this.ctx.cookies.set('jwt', token, {
      httpOnly: true,
      signed: false,
      encrypt: true,
    });
    return '9999999';
  }

  @Post('/signOut')
  public async signOut(): Promise<any> {
    const token = await this.ctx.cookies.get('jwt', {
      signed: false,
      encrypt: true,
    });
    return token;
  }

  /**
   * 注册
   * @param {SignUpDto} signUpDto
   * @returns {Promise<any>}
   * @memberof OperAccount
   */
  @Post('/signUp')
  @Validate(SignUpDto.signUpRule)
  public async signUp(@RequestBody('body') signUpDto: SignUpDto): Promise<any> {
    return await this.ctx.service.oper.account.signUp(signUpDto);
  }
}

export default OperAccount;
