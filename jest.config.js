module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "json"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "/dist/",
    "/typings/",
    "/bin/",
    "/src/index.ts"
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 45,
      functions: 60,
      lines: 50
    }
  },
  testMatch: ["**/?(*.)(test).(js|ts)"],
  collectCoverageFrom: ["src/**/*.(js|ts)"]
};
