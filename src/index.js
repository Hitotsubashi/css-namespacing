const divide = require('./divide');
const namespacing = require('./namespacing');
const validateOption = require('./validate');
const AnnotaionHandler = require('./handler/annotation-handler');

const ns = function ns(source, option = {}) {
  validateOption(option);
  const annoHandler = new AnnotaionHandler();
  const handledSource = annoHandler.collectAnno(source);
  const results = divide(handledSource, option);
  const handledSections = results.map((result) => namespacing(result.source, result.option));
  return annoHandler.resetAnno(handledSections.join(''));
};

module.exports = ns;
