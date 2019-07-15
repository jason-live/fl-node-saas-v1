import { WciDurianInterceptor } from 'wci-durian';

class PassportIct extends WciDurianInterceptor {
  async handleInterceptor() {
    await console.log('passport 逻辑');
  }
}

export default PassportIct;
