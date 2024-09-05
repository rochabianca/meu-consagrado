const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // implement node event listeners here
      return config
    },
    baseUrl: 'http://localhost:8080/',
    experimentalRunAllSpecs: true,
  },
});
