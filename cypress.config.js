const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: "tests/e2e/fixtures",
  screenshotsFolder: "tests/e2e/screenshots",
  videosFolder: "tests/e2e/videos",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080/'
  },
});
