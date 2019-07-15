import { Application } from 'egg';
import WciDurian from 'wci-durian';
import WciRouter, { EngineEgg } from 'wci-router';

export default (app: Application) => {
  const engineEgg = new EngineEgg({
    router: app.router,
    prefix: '/fl-saas-bin',
    initData: WciDurian.metadatas(),
  });
  return new WciRouter(engineEgg);
};
