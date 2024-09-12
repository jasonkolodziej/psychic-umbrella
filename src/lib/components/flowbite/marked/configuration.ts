// ? reference: https://github.com/magidoc-org/magidoc/blob/85548741d61ebd796ea440c87e202c0431ab26c9/packages/plugins/svelte-marked/src/lib/markdown/markedConfiguration.ts
import {
	extensions,
	type TokenExtractionParameters,
	type MarkdownOptions,
	type Renderers
} from '@magidoc/plugin-svelte-marked';
// import defaultRenderers from '@magidoc/plugin-svelte-marked';
import {
	marked,
	type MarkedExtension,
	type TokenizerAndRendererExtension,
	type Tokens
} from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import markedFootnote from 'marked-footnote';
//? my custom components
import BackgroundColor from '$components/flowbite/marked/extensions/BackgroundColor.svelte';
import {
	BlockQuote,
	Br,
	Del,
	Dfn,
	Em,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	List,
	ListItem,
	MarkdownCode,
	MarkdownCodeSpan,
	Paragraph,
	Space,
	Strong,
	Table,
	Text
} from './typeography';
// import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki';

//? Reference: https://marked.js.org/docs/using_pro#renderer
//? Reference: https://magidoc.js.org/svelte-plugins/marked

export const customExtension = extensions.containerExtension(
	(params: TokenExtractionParameters) => {
		if (params.type === 'background-color') {
			//? This will become the `token` parameter of our component
			console.log(params.type);
			return {
				type: 'background-color', //? This is the `renderer` name.
				raw: params.raw,
				color: params.options['color'] ?? 'red',
				//? This empty array indicates the container plugin that you wish
				//? to parse the content of of the container as markdown
				//? It will be automatically populated if it is present.
				//* If you do not wish to render the content as markdown, set this to null or undefined
				tokens: []
			};
		}

		return null;
	}
);

// Override function
export const postprocess = (html: string | Node) => {
	return DOMPurify.sanitize(html);
};

//TODO: removal of shiki code
// export const highlighter = await createHighlighter({
// 	themes: Object.values(bundledThemes),
// 	langs: Object.values(bundledLanguages)
// });

//? The marked-footnote extension accepts the following configuration options:
//? Reference: https://www.npmjs.com/package/marked-footnote
const markedFootnoteOptions = {
	//* The prefix ID for footnotes. Defaults to 'footnote-'.
	prefixId: 'footnote-',
	//* The description of footnotes, used by aria-labeledby attribute. Defaults to 'Footnotes'.
	description: 'Footnotes',
	//* If set to true, it will place footnote reference in square brackets, like this: [1]. Defaults to false.
	refMarkers: false
};

//? Step 1, register our custom extension
export const customOption: MarkedExtension = {
	extensions: [customExtension as unknown as TokenizerAndRendererExtension],
	hooks: {
		postprocess // Used to sanitize the output
	}
};

export const customOptions: MarkedExtension[] = [
	customOption,
	markedFootnote(markedFootnoteOptions)
];

//! Step 2, register our custom renderer
// marked.use(customOptions);
// Step 3, create a custom renderer
export const mappedRenderers: Renderers = {
	//? Custom container extension
	'background-color': BackgroundColor,
	//? Default renderers
	img: Img,
	heading: Heading,
	blockquote: BlockQuote,
	list: List,
	list_item: ListItem,
	br: Br,
	code: MarkdownCode,
	codespan: MarkdownCodeSpan,
	table: Table,
	html: Html,
	paragraph: Paragraph,
	link: Link,
	text: Text,
	def: Dfn,
	del: Del,
	em: Em,
	hr: Hr,
	strong: Strong,
	space: Space,
	escape: Space
};

//? Block level custom renderers
// const space = (token: Tokens.Space): string => {};
// const code = (token: Tokens.Code): string => {};
// const blockquote = (token: Tokens.Blockquote): string => {};
// const html = (token: Tokens.HTML | Tokens.Tag): string => {};
// const heading = (token: Tokens.Heading): string => {};
// const hr = (token: Tokens.Hr): string => {};
// const list = (token: Tokens.List): string => {};
// const listitem = (token: Tokens.ListItem): string => {};
// const checkbox = (token: Tokens.Checkbox): string => {};
// const paragraph = (token: Tokens.Paragraph): string => {};
// const table = (token: Tokens.Table): string => {};
// const tablerow = (token: Tokens.TableRow): string => {};
// const tablecell = (token: Tokens.TableCell): string => {};

//? Inline level custom renderers
// const strong = (token: Tokens.Strong): string => {};
// const em = (token: Tokens.Em): string => {};
// const codespan = (token: Tokens.Codespan): string => {};
// const br = (token: Tokens.Br): string => {};
// const del = (token: Tokens.Del): string => {};
// const link = (token: Tokens.Link): string => {};
// const image = (token: Tokens.Image): string => {};
// const text = (token: Tokens.Text | Tokens.Escape | Tokens.Tag): string => {};
