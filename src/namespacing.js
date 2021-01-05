const AnnotaionHandler = require('./handler/annotation-handler');
const AttributeselectorHandler = require('./handler/attributeseletor-handler');
const QuotesHandler = require('./handler/quotes-handler.js');
const nameHandler = require('./handler/name-handler');

const DEFAULT_OPTION = {
  namespace: 'cst-',
};

function setOption(option) {
  Object.entries(DEFAULT_OPTION).forEach(([key, value]) => {
    /* eslint-disable-next-line */
    option[key] = option[key] || value;
  });
}

const PROPERTY_LINE_REG = '\\s*[a-z-\\s]+:[^;]+;\\s*';
const PROPERTY__LAST_LINE_REG = '\\s*[a-z-\\s]+:[^\\}]+';
const CLASS_NAME = '\\.[^@\\{;\\}]+';
const REG = new RegExp(`(${CLASS_NAME})(\\{\\s*?((${AnnotaionHandler.ANNO_MARK})*${PROPERTY_LINE_REG}(${AnnotaionHandler.ANNO_MARK})*)*?(${PROPERTY__LAST_LINE_REG})?(${AnnotaionHandler.ANNO_MARK})*\\})`, 'gm');

const processName = function processName(name, option) {
  return nameHandler.processName(name, option);
};

const processClass = function processClass(source, option) {
  const result = source.replace(REG, (object, name, content) => {
    const modifiedName = processName(name, option);
    return modifiedName + content;
  });
  return result;
};

const namespacing = function namespacing(source, option = {}) {
  setOption(option);
  const annoHandler = new AnnotaionHandler();
  const attrseleHandler = new AttributeselectorHandler();
  const quotesHandler = new QuotesHandler();
  let result = annoHandler.collectAnno(source);
  result = attrseleHandler.collectAttr(result);
  result = quotesHandler.collectUrl(result);
  result = processClass(result, option);
  result = quotesHandler.resetUrl(result);
  result = attrseleHandler.resetAttr(result, option);
  result = annoHandler.resetAnno(result);
  return result;
};

module.exports = namespacing;