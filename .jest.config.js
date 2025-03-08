module.exports = {
  // The root directory that Jest should scan for files
  rootDir: 'src',

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],

  // An array of regexp pattern strings that are matched against all test paths
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/'
  ],

  // An array of regexp pattern strings that are matched against all source file paths
  modulePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/'
  ],

  // A map from regular expressions to module names that allow to stub out resources
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1'
  },

  // A list of paths to directories that Jest should use to search for files in
  moduleDirectories: ['node_modules', 'src'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },

  // An array of regexp pattern strings that are matched against all source file paths
  transformIgnorePatterns: [
    '/node_modules/(?!(@mui|@babel|@emotion)/)'
  ],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: '../coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/',
    '/__tests__/',
    '/__mocks__/'
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // The maximum amount of workers used to run your tests
  maxWorkers: '50%',

  // Automatically restore mock state between every test
  restoreMocks: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Automatically reset mock state between every test
  resetMocks: true,

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // An array of regexp patterns that are matched against all test paths before executing the test
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/'
  ],

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  // Setup files to run before each test
  setupFiles: [
    '<rootDir>/../jest.setup.js'
  ],

  // Setup files to run after the environment is set up
  setupFilesAfterEnv: [
    '<rootDir>/../jest.setup.afterEnv.js'
  ],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: [
    '@emotion/jest/serializer'
  ],

  // The test environment options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
}; 