const defaults = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testURL: 'http://localhost',
  setupFiles: ['./jestSetup.js'],
}

const standardConfig = {
  ...defaults,
  displayName: 'ReactDOM',
}

module.exports = {
  projects: [standardConfig],
}
