# maxgraph-examples-shared

This package contains the code and assets that are shared between all projects.

It mainly includes the code calling `@maxGraph/core` to initialize the `Graph`.

## Setup

From the repository root, run `npm install`. For more details, see the [root README](../../README.md#setup).

## Develop

From the repository root, run `npm run dev -w projects/_shared`. The package will be continuously built making any change
available in other projects using it.

To build a static version of the "shared" package, run `npm run build -w projects/_shared`.
