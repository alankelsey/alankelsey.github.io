const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // github action path : remove for local cypress runs
    supportFile: 'tests/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: '**/*.js',
    baseUrl: 'https://alankelsey.github.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
