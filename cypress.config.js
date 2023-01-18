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
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mocha-junit-reporter",
      cypressMochawesomeReporterReporterOptions:{
        reportDir: "cypress/reports",
        charts: true,
        reportPageTitle: "My Test Suite",
        embeddedScreenshots: true,
        inlineAssets: true
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: "cypress/reports/junit/results-[hash].xml"
      }
    },
    video: false
  }
});
