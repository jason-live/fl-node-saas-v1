import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { AccountError } from '../../../../app/err';

describe('test/service/account.test.js', () => {
  let ctx: Context;
  before(() => {
    ctx = app.mockContext();
  });

  it('signUp() - 账号注册成功', async () => {
    const user = await ctx.service.oper.account.signUp({
      username: '袁杨',
      password: '111111',
      account: '15161461631',
    });
    assert(user);
    assert(user.id);
  });

  it('signUp() - 账号插入重复', async () => {
    try {
      await ctx.service.account.signUp({
        username: '袁杨',
        password: '111111',
        account: '15161461631',
      });
    } catch (err) {
      assert(err.message === AccountError.ACCOUNT_UNEMPTY_ERROR.message);
    }
  });

  it('signIn() - 登陆成功', async () => {
    const user = await ctx.service.oper.account.signIn({
      password: '111111',
      account: '15161461631',
    });
    assert(user);
    assert(user.mobile);
  });

  it('signIn() - 用户名错误', async () => {
    try {
      await ctx.service.oper.account.signIn({
        password: '111111',
        account: '15161461622',
      });
    } catch (err) {
      assert(err.message === AccountError.ACCOUNT_PASSWORD_ERROR.message);
    }
  });

  it('signIn() - 密码错误', async () => {
    try {
      await ctx.service.oper.account.signIn({
        password: '222222',
        account: '15161461631',
      });
    } catch (err) {
      assert(err.message === AccountError.ACCOUNT_PASSWORD_ERROR.message);
    }
  });

  it('signOut() - 登出成功', async () => {
    const result = await ctx.service.oper.account.signOut({
      account: '15161461631',
    });
    assert(result.account === '15161461622');
  });

  it('signOut() - 登出失败', async () => {
    try {
      await ctx.service.oper.account.signOut({
        account: '15161461622',
      });
    } catch (err) {
      assert(err.message === AccountError.ACCOUNT_EMPTY_ERROR.message);
    }
  });
});
