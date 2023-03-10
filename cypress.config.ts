import { defineConfig } from "cypress";
import createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', createBundler());
    },
    baseUrl: "https://www.onliner.by/",
  },
  watchForFileChanges: false,
  defaultCommandTimeout: 10000,
  viewportHeight: 720,
  viewportWidth: 1280
});
