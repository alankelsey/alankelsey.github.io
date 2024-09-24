const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // github action path
    supportFile: 'tests/cypress/support/e2e.{js,jsx,ts,tsx}',
    //local work
    // supportFile: '/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: '**/*.js',
    baseUrl: 'https://alankelsey.github.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
