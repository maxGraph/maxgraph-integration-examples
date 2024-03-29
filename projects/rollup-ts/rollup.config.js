import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		file: 'public/bundle.js',
		format: 'es',
		sourcemap: true
	},
	plugins: [
		resolve(), // tells Rollup how to find dependencies in node_modules
		typescript(), // so Rollup can convert TypeScript to JavaScript
		production && terser() // minify, but only in production
	]
};
