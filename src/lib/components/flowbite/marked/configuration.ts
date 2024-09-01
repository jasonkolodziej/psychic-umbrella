// ? reference: https://github.com/magidoc-org/magidoc/blob/85548741d61ebd796ea440c87e202c0431ab26c9/packages/plugins/svelte-marked/src/lib/markdown/markedConfiguration.ts
import {
	extensions,
	type TokenExtractionParameters,
	type MarkdownOptions,
	type Renderers
} from '@magidoc/plugin-svelte-marked';
import defaultRenderers from '@magidoc/plugin-svelte-marked';
import {
	marked,
	type MarkedExtension,
	type TokenizerAndRendererExtension,
	type Tokens
} from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import BackgroundColor from '$components/flowbite/marked/extensions/BackgroundColor.svelte';
import Img from '$components/flowbite/marked/typeography/Img.svelte';
import Heading from '$components/flowbite/marked/typeography/Heading.svelte';
import List from '$components/flowbite/marked/typeography/List.svelte';
import ListItem from '$components/flowbite/marked/typeography/ListItem.svelte';
import BlockQuote from '$components/flowbite/marked/typeography/BlockQuote.svelte';
import Paragraph from '$components/flowbite/marked/typeography/Paragraph.svelte';
import Link from '$components/flowbite/marked/typeography/Link.svelte';
import Hr from '$components/flowbite/marked/typeography/Hr.svelte';
import Table from '$components/flowbite/marked/table/Table.svelte';

//? Reference: https://marked.js.org/docs/using_pro#renderer
//? Reference: https://magidoc.js.org/svelte-plugins/marked

const customExtension = extensions.containerExtension((params: TokenExtractionParameters) => {
	if (params.type === 'background-color') {
		//? This will become the `token` parameter of our component
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
});

// Override function
const postprocess = (html: string | Node) => {
	return DOMPurify.sanitize(html);
};

// Step 1, register our custom extension
export const customOptions: MarkedExtension = {
	extensions: [customExtension as unknown as TokenizerAndRendererExtension],
	hooks: {
		postprocess // Used to sanitize the output
	}
};

//! Step 2, register our custom renderer
// marked.use(customOptions);
// Step 3, create a custom renderer
export const mappedRenderers: Renderers = {
	//? Default renderers
	img: Img,
	heading: Heading,
	list: List,
	listItem: ListItem,
	blockquote: BlockQuote,
	paragraph: Paragraph,
	link: Link,
	hr: Hr,
	table: Table,
	//? Custom container extension
	'background-color': BackgroundColor
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
