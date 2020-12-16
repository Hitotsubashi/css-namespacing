function AttributeselectorHandler() {
  this.recordIndex = 0;
  this.record = {};
  this.ATTR_SELECTOR_REG = new RegExp(/(\s*\[[^=]+=("[^"]*")?('[^']*')?([^\]]*)?\]\s*)/, 'gm');
  this.ATTR_MARK_REG = new RegExp(`(${AttributeselectorHandler.ATTR_MARK})`, 'gm');
  this.collectAttr = (content) => content.replace(this.ATTR_SELECTOR_REG, (attr) => {
    const mark = `^${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = attr;
    return mark;
  });
  this.resetAttr = (content, prefix) => content.replace(this.ATTR_MARK_REG,
    (mark) => this.record[mark].replace(
      /\[(class.?=)['"]?([^'"\]]*?)['"]?\]/gm,
      (object, left, right) => {
        let modifiedRight = right;
        modifiedRight = modifiedRight.split(/\s+/).map((el) => `${prefix}${el}`).join(' ');
        return `[${left}"${modifiedRight}"]`;
      },
    ));
}

AttributeselectorHandler.ATTR_MARK = '\\^\\d+';
module.exports = AttributeselectorHandler;
