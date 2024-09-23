const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'support/e2e.js',
    specPattern: '**/*.js',
    baseUrl: 'https://alankelsey.github.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
