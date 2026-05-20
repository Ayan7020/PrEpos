const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  roots: ["<rootDir>/src"],
  testMatch: [
     "**/*.spec.ts",
    "**/*.test.ts"
  ],
  transform: {
    ...tsJestTransformCfg,
  },
  clearMocks: true,
};