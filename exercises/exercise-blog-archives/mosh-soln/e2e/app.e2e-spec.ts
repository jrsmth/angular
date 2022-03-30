import { RoutingPage } from './app.po';

describe('routing App', () => {
  let page: RoutingPage;

  beforeEach(() => {
    page = new RoutingPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
