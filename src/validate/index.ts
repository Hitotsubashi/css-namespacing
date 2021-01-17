const { validate } = require('schema-utils');
const { optionCheck, notCheck, onlyCheck } = require('./schema');

export default function validateOption(option:{[prop:string]:any}):void {
  validate(optionCheck.schema, option, optionCheck.config);
  if (option.not) {
    validate(notCheck.schema, option.not, notCheck.config);
  }
  if (option.only) {
    validate(onlyCheck.schema, option.only, onlyCheck.config);
  }
}
