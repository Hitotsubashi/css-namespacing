function QuotesHandler() {
  this.recordIndex = 0;
  this.record = {};
  this.QUOTES_REG = new RegExp(/(\s*("|')[\s\S]*?\1\s*)/, 'gm');
  this.collectUrl = (content) => content.replace(this.URL_REG, (url) => {
    const mark = `&${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = url;
    return mark;
  });
  this.resetUrl = (content) => content.replace(this.URL_MARK_REG, (mark) => this.record[mark]);
}

QuotesHandler.URL_MARK = '\\&\\d+';
module.exports = QuotesHandler;
