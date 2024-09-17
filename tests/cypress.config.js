const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://alankelsey.github.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
