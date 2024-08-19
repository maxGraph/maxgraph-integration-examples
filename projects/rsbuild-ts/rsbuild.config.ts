import { defineConfig } from '@rsbuild/core';

export default defineConfig({
    html: {
        favicon: './src/assets/favicon-128x128.png',
        title: 'maxGraph Rsbuild TypeScript example',
    },
    output: {
        // ensure assets are correctly loaded when the application is not at the root of the server, for examples when it is deployed on GitHub pages.
        assetPrefix: 'auto',
    }
    // enforce a chunk per module to better track the size of the maxGraph chunk.
    // We don't need it here because we have a single dependency, so the chunk automatically generated only includes the maxGraph module.
    // In addition, this also split chunks for the CSS files, which is not what we want (at least for now).
    // https://rsbuild.dev/guide/optimization/split-chunk#split-by-module
    // performance: {
    //     chunkSplit: {
    //         strategy: 'split-by-module',
    //     },
    // },
});


