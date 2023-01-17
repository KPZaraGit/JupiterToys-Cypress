const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://jupiter.cloud.planittesting.com",
    viewportHeight: 1000,
    viewportWidth: 1280,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 120000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
