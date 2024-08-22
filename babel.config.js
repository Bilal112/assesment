module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@components': './src/shared/components',
          '@services': './src/shared/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@i18n': './src/assets/localization',
          '@actions': './src/redux/actions',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
