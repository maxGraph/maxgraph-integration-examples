# maxGraph integration examples

Demonstrate how to integrate [maxGraph](https://github.com/maxGraph/maxGraph/) in projects.

⏩ Find the live demo at https://maxgraph.github.io/maxgraph-integration-examples/

## Getting started

### Setup

Ensure you are using Node 18 (this is the tested version, it may work with other versions without guarantee)

If you are using `nvm`, run
```shell
nvm use
```

If the Node version is not installed, `nvm` will state how to install the required version.

Install dependencies by running
```shell
npm install
```

Build the "shared" package:
- this package is used in all projects, so it must be built first.
- for more details, see its [dedicated README](projects/_shared/README.md).

### Available projects

- [TypeScript with Lit](./projects/lit-ts/README.md)
- [TypeScript with Parcel](./projects/parcel-ts/README.md)
- [TypeScript with Rollup](./projects/rollup-ts/README.md)
- [TypeScript with SvelteKit](./projects/sveltekit-ts/README.md)
- [TypeScript with ViteJs](./projects/vitejs-ts/README.md)

### <a id="maxgraph-dev-version"></a> Use the maxGraph development version

**Note**: the `maxGraph` development version is tested in a [GitHub Workflow](./.github/workflows/check-typescript-projects.yml) that uses the procedure explained below.

Build [maxGraph](https://github.com/maxGraph/maxGraph/) locally:
  - from the `maxGraph` project root, run: `npm install`
  - then, from the `packages/core` folder, run: `npm pack`
  - the `packages/core` folder or the generated `packages/core/maxgraph-core-***.tgz` file are now ready for use in an external project

In this folder where you clone the `maxgraph-integration-examples` project, go to the folder of the example you want to use. Then you can use one of the following solution
  - with [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link): `npm link <path_to_locally_installed_maxgraph>/packages/core`: create a soft link to the maxgraph local folder.
  Repack of maxgraph is automatically available in the examples
  - alternative: `npm install <path_to_locally_installed_maxgraph>/packages/core/maxgraph-core-0.1.0.tgz`. This changes
  the package.json file. You must run this command again each time you rebuild the maxgraph npm package.


## Release

Versioning scheme: follow version of maxGraph. For example, 0.5.0 uses maxgraph 0.5.0

**TODO update the following**

Once done, create a Pull Request in the [integration examples repository](https://github.com/maxGraph/maxgraph-integration-examples) to use the new release.
- Dependencies in this repository are automatically updated by Dependabot, so you can trigger a new Dependabot run or wait for the next scheduled Dependabot run for this update to take place.
- Validate that the examples work: use the artifact built by GitHub Actions to test the various applications locally.

Then, create a [new draft release](https://github.com/maxGraph/maxgraph-integration-examples/releases):
- name: use the same version as in `maxGraph`, like `0.2.1` 
- tag: use the version prefixed with v, like `v0.2.1`
- save it as a draft

Generate the list of the major changes by using the [automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes).

Also add links to the releases previously created for `maxGraph`. As an example, see the release of the [0.2.1 version](https://github.com/maxGraph/maxgraph-integration-examples/releases/tag/v0.2.1).

Publish the release.
