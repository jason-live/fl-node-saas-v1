import { Controller } from 'egg';
import { ControllerMapping, Post, RequestBody } from 'wci-durian';
import { sign } from 'jsonwebtoken';

@ControllerMapping('/account')
class Account extends Controller {

  @Post('/signIn')
  public async signIn(@RequestBody('body') body: any): Promise<any> {
    console.log(body);
    const token = sign({ foo: 'bar' }, 'shhhhh');
    this.ctx.cookies.set('jwt', token, {
      httpOnly: true,
      signed: false,
      encrypt: true,
    });
    return token;
  }

  @Post('/signOut')
  public async signOut(): Promise<any> {
    const token = await this.ctx.cookies.get('jwt', {
      signed: false,
      encrypt: true,
    });
    return token;
  }

  @Post('/signUp')
  public async signUp(@RequestBody('body') body: any): Promise<any> {
    console.log(body);
    const token = await this.ctx.cookies.get('jwt', {
      signed: false,
      encrypt: true,
    });
    return token;
  }
}

export default Account;
