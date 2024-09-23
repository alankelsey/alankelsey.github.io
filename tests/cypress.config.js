const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'tests/cypress/support/e2e.{js,jsx,ts,tsx}', // /home/runner/work/alankelsey.github.io/alankelsey.github.io
    specPattern: '**/*.js',
    baseUrl: 'https://alankelsey.github.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
