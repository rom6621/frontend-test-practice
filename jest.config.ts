import { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.+)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],

  /* coverage */
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default jestConfig;
