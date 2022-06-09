# maxGraph integration examples

Demonstrate how to integrate [maxGraph](https://github.com/maxGraph/maxGraph/) in projects.

**Important**: currently, there is no package published on npmjs, so use the [maxGraph development version](#maxgraph-dev-version) 

## Getting started

### Setup

Ensure you are using Node 16 (this is the tested version, it may work with other versions without guarantee)

If you are using `nvm`, run
```shell
nvm use
```

If the Node version is not installed, `nvm` will state how to install the required version.


### <a id="maxgraph-dev-version"></a> Use the maxGraph development version

Build [maxGraph](https://github.com/maxGraph/maxGraph/) locally and run [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link) in the examples.

In the maxGraph project
- go to packages/core
- run `npm pack`

In this repository, go to the folder of the example you want to use. Then you can use one of the following solution
- the preferred way: `npm link <path_to_locally_installed_maxgraph>/packages/core`: create a soft link to the maxgraph local folder. Repack of maxgraph is
automatically available in the examples
- alternative: `npm install npm install <path_to_locally_installed_maxgraph>/packages/core/maxgraph-core-0.1.0.tgz`. For static install, this changes
the package.json file, you must run this command again if you want to benefit


### Available projects

- [TypeScript with Parcel](./projects/parcel-ts/README.md)
- [TypeScript with Rollup](./projects/rollup-ts/README.md)
- [TypeScript with ViteJs](./projects/vitejs-ts/README.md)
