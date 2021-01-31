module.exports = {
  root: true,
  env: {
    node: true,
  },
  // extends: [
  //   'airbnb',
  //   'plugin:@typescript-eslint/recommended',
  // ],
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   parser: 'babel-eslint',
  // },
  rules: {
    'no-console':  'warn' ,
    'no-debugger':  'warn' ,
    'no-eval': ['off'],
  },
  overrides: [
    {
      files: [
        '**/tests/**',
      ],
      env: {
        jest: true,
      },
      parserOptions: {
        parser: 'babel-eslint',
      },
      extends: ['airbnb'],
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
};
