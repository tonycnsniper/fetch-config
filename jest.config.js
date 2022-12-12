module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.spec.ts'
  ],
  testEnvironment: 'node'
}
