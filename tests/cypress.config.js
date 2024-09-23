const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.js',
    baseUrl: 'https://alankelsey.github.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
