const AnnotaionHandler = require('./annotation-handler');
const AttributeselectorHandler = require('./attributeseletor-handler');
const UrlHandler = require('./url-handler');

const PROPERTY_LINE_REG = '\\s*[a-z-\\s]+:[^;]+;\\s*';
const PROPERTY__LAST_LINE_REG = '\\s*[a-z-\\s]+:[^\\}\\/]+';
const CLASS_NAME = '\\.[^@\\{;\\}]+';
const REG = new RegExp(`(${CLASS_NAME})(\\{\\s*?((${AnnotaionHandler.ANNO_MARK})*${PROPERTY_LINE_REG}(${AnnotaionHandler.ANNO_MARK})*)*?(${PROPERTY__LAST_LINE_REG})?(${AnnotaionHandler.ANNO_MARK})*\\})`, 'gm');

const processName = function processName(name, prefix) {
  return name.replace(/\./gm, `.${prefix}`);
};

const processClass = function processClass(source, prefix) {
  const result = source.replace(REG, (object, name, content) => {
    const modifiedName = processName(name, prefix);
    return modifiedName + content;
  });
  return result;
};

const namespacing = function namespacing(source, prefix = 'cst-') {
  if (typeof source !== 'string') {
    throw new Error('source should be a type of string');
  }
  if (typeof prefix !== 'string') {
    throw new Error('source should be a type of string');
  }
  const annoHandler = new AnnotaionHandler();
  const attrseleHandler = new AttributeselectorHandler();
  const urlHandler = new UrlHandler();
  let result = annoHandler.collectAnno(source);
  result = attrseleHandler.collectAttr(result);
  result = urlHandler.collectUrl(result);
  result = processClass(result, prefix);
  result = urlHandler.resetUrl(result);
  result = attrseleHandler.resetAttr(result, prefix);
  result = annoHandler.resetAnno(result);
  return result;
};

module.exports = namespacing;
