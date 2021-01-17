exports.optionCheck = {
  schema: {
    type: 'object',
    properties: {
      namespace: {
        type: 'string',
      },
      not: {
        instanceof: 'Array',
      },
      only: {
        instanceof: 'Array',
      },
    },
    additionalProperties: false,
  },
  config: {
    name: 'option',
    baseDataPath: 'option',
  },
};

exports.notCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'option.not',
    baseDataPath: 'option.not',
  },
};

exports.onlyCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'option.only',
    baseDataPath: 'option.only',
  },
};
