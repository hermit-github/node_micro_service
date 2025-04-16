/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset:"ts-jest",
  clearMocks: true,
  collectCoverage: true,
  verbose:true,
  coveragePathIgnorePatterns: ["/node_modules"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleDirectories:["node_modules", "src"],
  testMatch: ['**/services/__test__/*.test.ts'],
};

export default config;
