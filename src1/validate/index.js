const { validate } = require('schema-utils');
const { optionCheck, notCheck, onlyCheck } = require('./schema');

function validateOption(option) {
  validate(optionCheck.schema, option, optionCheck.config);
  if (option.not) {
    validate(notCheck.schema, option.not, notCheck.config);
  }
  if (option.only) {
    validate(onlyCheck.schema, option.only, onlyCheck.config);
  }
}

module.exports = validateOption;
