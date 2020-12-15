const AnnotaionHandler = require('./annotation-handler');

const PROPERTY_LINE_REG = '\\s*[a-z-\\s]+:[^;]+;\\s*';
const PROPERTY__LAST_LINE_REG = '\\s*[a-z-\\s]+:[^\\}\\/]+';
const CLASS_NAME = '\\.[^@\\{;\\}]+';
const REG = new RegExp(`(${CLASS_NAME})(\\{\\s*?((${AnnotaionHandler.ANNO_MARK})*${PROPERTY_LINE_REG}(${AnnotaionHandler.ANNO_MARK})*)*?(${PROPERTY__LAST_LINE_REG})?(${AnnotaionHandler.ANNO_MARK})*\\})`, 'gm');

const processClassAttributeSelector = function processClassAttributeSelector(name, prefix) {
  return name.replace(/\[(class.?=)([^\]]+)\]/gm, (object, left, right) => {
    let modifiedRight = right;
    if (right.includes("'") || right.includes('"')) {
      modifiedRight = modifiedRight.slice(1, -1);
    }
    modifiedRight = modifiedRight.split(/\s+/).map((el) => `${prefix}${el}`).join(' ');
    return `[${left}"${modifiedRight}"]`;
  });
};

const processName = function processName(name, prefix) {
  const nameArr = name.split('');
  let inAttribute = false;
  let inAttributeContent = false;
  let attributeContentSymbol;
  for (let i = 0; i < nameArr.length; i += 1) {
    switch (nameArr[i]) {
      case '.':
        if (!inAttribute) {
          nameArr.splice(i, 1, `.${prefix}`);
        }
        break;
      case '[':
        inAttribute = true;
        break;
      case ']':
        if (!inAttributeContent) {
          inAttribute = false;
        }
        break;
      case '"':
      case "'":
        if (!inAttributeContent) {
          inAttributeContent = true;
          attributeContentSymbol = nameArr[i];
        } else if (nameArr[i] === attributeContentSymbol) inAttributeContent = false;
        break;
      default:
        break;
    }
  }
  let modifiedName = nameArr.join('');
  modifiedName = processClassAttributeSelector(modifiedName, prefix);
  return modifiedName;
};

const processClass = function processClass(source, prefix) {
  const result = source.replace(REG, (object, name, content) => {
    const modifiedName = processName(name, prefix);
    return modifiedName + content;
  });
  return result;
};

const namespacing = function namespacing(source, prefix = 'cst-') {
  const annoHandler = new AnnotaionHandler();
  let result = annoHandler.collectAnno(source);
  result = processClass(result, prefix);
  result = annoHandler.resetAnno(result);
  return result;
};

module.exports = namespacing;
