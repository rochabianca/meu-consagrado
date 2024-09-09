const { defineConfig } = require("cypress");
const codeCoverage = require("@cypress/code-coverage/task");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // @ts-ignore
      codeCoverage(on, config);
      // implement node event listeners here
      return config;
    },
    baseUrl: "http://localhost:8080/",
    experimentalRunAllSpecs: true
  }
});
