import { TPLab4Page } from './app.po';

describe('tplab4 App', () => {
  let page: TPLab4Page;

  beforeEach(() => {
    page = new TPLab4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
