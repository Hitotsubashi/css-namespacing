function UrlHandler() {
  this.recordIndex = 0;
  this.record = {};
  this.URL_REG = new RegExp(/(\s*url\([^)]+\)\s*)/, 'gm');
  this.URL_MARK_REG = new RegExp(`(${UrlHandler.URL_MARK})`, 'gm');
  this.collectUrl = (content) => content.replace(this.URL_REG, (url) => {
    const mark = `&${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = url;
    return mark;
  });
  this.resetUrl = (content) => content.replace(this.URL_MARK_REG, (mark) => this.record[mark]);
}

UrlHandler.URL_MARK = '\\&\\d+';
module.exports = UrlHandler;
