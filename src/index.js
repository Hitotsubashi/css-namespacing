const divide = require('./divide');
const namespacing = require('./namespacing');
const validateOption = require('./validate');

const ns = function ns(source, option = {}) {
  validateOption(option);
  const results = divide(source, option);
  const handledSections = results.map((result) => namespacing(result.source, result.option));
  return handledSections.join('');
};

module.exports = ns;
