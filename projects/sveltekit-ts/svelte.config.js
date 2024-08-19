import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// For GitHub Pages, use https://kit.svelte.dev/docs/adapter-static
		adapter: adapter({
			// In https://kit.svelte.dev/docs/adapter-static#github-pages, the page '404.html' is used as a fallback.
			// We cannot use it here because the app is deployed to a subdirectory. The 404 page for the deployment should be placed in the root of the deployment.
			// The configured callback lets access to https://maxgraph.github.io/maxgraph-integration-examples/maxgraph-integration-examples/sveltekit-ts
			fallback: 'index.html',
			pages: 'dist',
		}),
		paths: {
			// We are deploying to a subdirectory as we have several applications in the same repository
			base: process.argv.includes('dev') ? '' : '/maxgraph-integration-examples/sveltekit-ts'
		}
	}
};

export default config;
