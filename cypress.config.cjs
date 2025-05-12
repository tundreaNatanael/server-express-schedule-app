const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on) {
      on('before:run', (details) => {
        console.log('Starting a test:', details.title);
      });

      on('after:run', (details) => {
        console.log('Completed test:', details.title);
      });
    },
  },
});
