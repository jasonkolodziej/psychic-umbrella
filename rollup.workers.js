import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
//? Ref: https://rollupjs.org/configuration-options/#output-globals
// import { terser } from 'rollup-plugin-terser';
import terser from '@rollup/plugin-terser';

const dev = true;

// bundle workers
export default ['compiler', 'bundler'].map((x) => ({
	input: `src/lib/components/mdsvex/Repl/workers/${x}/index.js`,
	output: {
		file: `static/workers/${x}.js`,
		format: 'iife'
	},
	plugins: [resolve(), json(), terser()]
}));
