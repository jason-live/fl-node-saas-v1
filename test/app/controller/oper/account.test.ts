import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { CommonError, AccountError } from '../../../../app/err/oper';

describe('test/controller/oper/account.test.js', () => {
  it('signUp() - 注册成功测试', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signUp')
      .send({
        username: '小袁',
        password: '111111',
        account: '15161461627',
      })
      .expect(200)
      .expect(res => {
        res.body.code = 200;
      });
  });

  it('signUp() - 注册失败测试', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signUp')
      .send({
        username: '小袁',
        password: '111111',
        account: '15161461625',
      })
      .expect(206)
      .expect(res => {
        assert.equal(res.body.msg, CommonError.DATABASE_ERROR.message);
      });
  });

  it('signIn() - 登陆成功', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signIn')
      .send({
        password: '111111',
        account: '15161461622',
      })
      .expect(200)
      .expect(res => {
        console.log(res.header['set-cookie']);
        res.body.code = 200;
      });
  });

  it('signIn() - 用户名密码错误', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signIn')
      .send({
        password: '1111111',
        account: '15161461622',
      })
      .expect(206)
      .expect(res => {
        assert.equal(res.body.msg, AccountError.ACCOUNT_PASSWORD_ERROR.message);
      });
  });

  it('signOut() - 登出成功', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signOut')
      .set('Cookie', [ 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5hbWUiOiLoooHmnagiLCJpc3MiOiJGTF9TQUFTIiwic3ViIjoxNTYzMTk0NTEzMjQ1NjI5LCJhdWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5iZiI6MTU2MzI1NjgwOC45NzEsImlhdCI6MTU2MzI1NjgwOC45NzEsImV4cCI6MTU2MzI2MDQwOH0.7KBx5Yzqvz6om9OIz-PACQjVMAeOApJGRgn5QKknfp8' ])
      .send({
        account: '15161461631',
      })
      .expect(200)
      .expect(res => {
        res.body.code = 200;
      });
  });

  it('signOut() - 登出失败（jwt伪装）', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signOut')
      .set('Cookie', [ 'jwt=yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5hbWUiOiLoooHmnagiLCJpc3MiOiJGTF9TQUFTIiwic3ViIjoxNTYzMTk0NTEzMjQ1NjI5LCJhdWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5iZiI6MTU2MzI2MTM1NCwiaWF0IjoxNTYzMjYxMzU0LCJleHAiOjE1NjMyNjEzNTR9.7FwqILLaJB1b5l1c1X6i-9x3TFWuBKp0lN8MHBmb-eI' ])
      .send({
        account: '15161461631',
      })
      .expect(206)
      .expect(res => {
        assert.equal(res.body.msg, AccountError.JWT_ERROR.message);
      });
  });

  it('signOut() - 登出失败（jwt未生效）', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signOut')
      .set('Cookie', [ 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5hbWUiOiLoooHmnagiLCJpc3MiOiJGTF9TQUFTIiwic3ViIjoxNTYzMTk0NTEzMjQ1NjI5LCJhdWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5iZiI6MTU2MzI2MTM1NCwiaWF0IjoxNTYzMjYxMzU0LCJleHAiOjE1NjMyNjEzNTR9.7FwqILLaJB1b5l1c1X6i-9x3TFWuBKp0lN8MHBmb-eI' ])
      .send({
        account: '15161461631',
      })
      .expect(206)
      .expect(res => {
        assert.equal(res.body.msg, AccountError.JWT_INVALID_ERROR.message);
      });
  });

  it('signOut() - 登出失败（jwt超时）', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/fl-saas-bin/oper/account/signOut')
      .set('Cookie', [ 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5hbWUiOiLoooHmnagiLCJpc3MiOiJGTF9TQUFTIiwic3ViIjoxNTYzMTk0NTEzMjQ1NjI5LCJhdWQiOjE1NjMxOTQ1MTMyNDU2MjksIm5iZiI6MTU2MzI1ODI3NiwiaWF0IjoxNTYzMjU4Mjc2LCJleHAiOjE1NjMyNTgyNzZ9.rh86etAG-5jype-9QcuOrE664WI0CC-4pS8CzZPQQS4' ])
      .send({
        account: '15161461631',
      })
      .expect(206)
      .expect(res => {
        assert.equal(res.body.msg, AccountError.JWT_TIMEOUT_ERROR.message);
      });
  });
});
