const { defineConfig } = require('cypress');

// Setup config for Cypress end-to-end test
module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {}
    }
});
