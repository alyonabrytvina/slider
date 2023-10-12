module.exports = {
  extends: ['airbnb', 'airbnb-typescript'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
    'no-param-reassign': 0,
    'jsx-a11y/control-has-associated-label': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-trailing-spaces': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-unsafe-optional-chaining': 'off',
  },
};
