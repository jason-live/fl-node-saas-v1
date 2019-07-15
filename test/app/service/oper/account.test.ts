import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/service/oper/account.test.js', () => {
  let ctx: Context;
  before(() => {
    ctx = app.mockContext();
  });

  it('signUp()', async () => {
    const account = await ctx.service.oper.account.signUp({
      username: 'yy',
      password: '222222',
      account: '15161461622',
    });
    assert(account);
    assert(account.id);
  });

  it('signIn()', async () => {
    const user = await ctx.service.oper.account.signIn({
      password: '222222',
      account: '15161461622',
    });
    assert(user);
    assert(user.mobile);
  });
});
