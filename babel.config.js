module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
