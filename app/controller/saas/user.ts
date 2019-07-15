import { Controller } from 'egg';
import { ControllerMapping, Post, RequestBody, Get } from 'wci-durian';
import { sign } from 'jsonwebtoken';

@ControllerMapping('/users')
class User extends Controller {

  @Post('')
  public async addUser(@RequestBody('body') body: any): Promise<any> {
    console.log(body);
    const token = sign({ foo: 'bar' }, 'shhhhh');
    this.ctx.cookies.set('jwt', token, {
      httpOnly: true,
      signed: false,
      encrypt: true,
    });
    return token;
  }

  @Get('/:id')
  public async getUser(): Promise<any> {
    const token = await this.ctx.cookies.get('jwt', {
      signed: false,
      encrypt: true,
    });
    return token;
  }

  @Get('')
  public async getUsersPageable(@RequestBody('body') body: any): Promise<any> {
    console.log(body);
    const token = await this.ctx.cookies.get('jwt', {
      signed: false,
      encrypt: true,
    });
    return token;
  }
}

export default User;
