function AttributeselectorHandler() {
  this.recordIndex = 0;
  this.record = {};
  this.ATTR_SELECTOR_REG = new RegExp(/(\[[^=]+=\])/);
}
