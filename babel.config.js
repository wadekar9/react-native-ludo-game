module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '$assets': './src/assets',
          '$constants': './src/constants',
          '$components': './src/components',
          '$helpers': './src/helpers',
          '$screens': './src/screens',
          '$redux': './src/redux',
          '$hooks': './src/hooks',
          '$navigation': './src/navigation',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
