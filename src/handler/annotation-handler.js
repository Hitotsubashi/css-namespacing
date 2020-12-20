function AnnotationHandler() {
  this.recordIndex = 0;
  this.record = {};
  // 该注释为sass注释，css不存在
  // this.ANNO_SINGLE = '\\/\\/.*';
  this.ANNO_MULTI = '\\/\\*(.|\\n)*?\\*\\/';
  // this.ANNO_REG = new RegExp(`(\\s*(${this.ANNO_SINGLE})|(${this.ANNO_MULTI})\\s*)`, 'gm');
  this.ANNO_REG = new RegExp(`(\\s*${this.ANNO_MULTI}\\s*)`, 'gm');
  this.ANNO_MARK_REG = new RegExp(`(${AnnotationHandler.ANNO_MARK})`, 'gm');
  this.collectAnno = (content) => content.replace(this.ANNO_REG, (anno) => {
    const mark = `$${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = anno;
    return mark;
  });
  this.resetAnno = (content) => content.replace(this.ANNO_MARK_REG, (mark) => this.record[mark]);
}

AnnotationHandler.ANNO_MARK = '\\$\\d+';
module.exports = AnnotationHandler;
