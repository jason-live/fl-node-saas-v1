import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
// import { AccountError } from '../../../../app/err';

describe('test/service/account.test.js', () => {
  let ctx: Context;
  before(() => {
    ctx = app.mockContext();
  });

  it('signUp() - 账号注册成功', async () => {
    const user = await ctx.service.account.signUp({
      username: '袁杨',
      password: '111111',
      account: '15161461631',
    });
    assert(user);
    assert(user.id);
  });
});
