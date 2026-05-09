import { ProRippleTalkTemplatePage } from './app.po';

describe('ProRippleTalk App', function () {
    let page: ProRippleTalkTemplatePage;

    beforeEach(() => {
        page = new ProRippleTalkTemplatePage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
