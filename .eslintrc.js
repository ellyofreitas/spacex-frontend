module.exports = {
  root: true,

  env: {
    node: true,
  },

  plugins: ['prettier'],

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'eslint:recommended',
    '@vue/prettier',
    'prettier',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'prettier/prettier': ['warn'],
    'import/extensions': 'off',
    "linebreak-style": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
