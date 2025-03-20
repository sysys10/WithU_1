module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-native/no-unused-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: 'off',
    'react-hooks/exhaustive-deps': 'off',
    // 'no-unused-vars': 'off',
  },
  parserOptions: {
    requireConfigFile: false,
  },
}
