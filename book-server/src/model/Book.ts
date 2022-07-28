import Page from './Page';

export default class Book {
  pages: Array<Page> = [];

  constructor(pages: Array<any>) {
    for(let page of pages) {
      this.pages.push(new Page(page.content));
    }
  }
}
