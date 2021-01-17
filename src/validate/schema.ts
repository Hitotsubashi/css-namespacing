export const optionCheck:SchemaCheck = {
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

export const notCheck:SchemaCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'option.not',
    baseDataPath: 'option.not',
  },
};

export const onlyCheck:SchemaCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'option.only',
    baseDataPath: 'option.only',
  },
};
