import { defineConfig } from '@farmfe/core';

export default defineConfig({
  compilation: {
    presetEnv: false,
    output: {
      // ensure assets are correctly loaded when the application is not at the root of the server, for examples when it is deployed on GitHub pages.
      publicPath: './',
    },
  },
});
