module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ftl$': 'jest-raw-loader',
  },
  moduleNameMapper: {
    'non-mock_en-US_strings.ftl': '<rootDir>/src/locales/en-US/strings.ftl',
    '.*/en-US/.*\\.ftl$': '<rootDir>/tests/mocks/enUSfluentMock.js',
    '.*\\.ftl$': '<rootDir>/tests/mocks/abcfluentMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['<rootDir>/**/*.spec.(js|jsx|ts|tsx)'],
};
