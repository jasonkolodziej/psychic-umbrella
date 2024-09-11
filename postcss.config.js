export default {
	plugins: {
		//? https://tailwindcss.com/docs/using-with-preprocessors#nesting
		'postcss-import': {},
		'tailwindcss/nesting': {},
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss: {},
		//But others, like autoprefixer, need to run after,
		autoprefixer: {}
	}
};
