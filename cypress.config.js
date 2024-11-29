const { defineConfig } = require ("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://192.168.0.16:4200",
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}',
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});