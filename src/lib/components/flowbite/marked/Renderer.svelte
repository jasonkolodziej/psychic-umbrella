<script lang="ts">
	import Markdown, { type Renderers } from '@magidoc/plugin-svelte-marked';
	import { marked } from 'marked';
	// ? Step 1, import our custom extension
	// import BackgroundColor from '$components/flowbite/marked/extensions/BackgroundColor.svelte';
	import {
		customOptions,
		mappedRenderers as renderers
	} from '$components/flowbite/marked/configuration';
	// import Img from '$components/flowbite/marked/typeography/Img.svelte';

	//? Step 2, register our custom extension
	marked.use(customOptions);
	let source = `
# One
## Two
### Three
#### Four
##### Five
###### Six

> This is a blockquote

> **Bold blockquote**

[This is a link](https://google.com)

[**this is a bold link**](https://google.com)

Here are the steps to set up svelte-marked plugin
  1. Install it
  2. Enjoy
      - If you enjoyed, make sure to star the repo!

Amazing image:
![Look at this image](https://lh3.googleusercontent.com/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc=w600)

:::background-color color="lightgray"
Look at this gray background with **internal markdown support**!!
:::
`;
</script>

<Markdown bind:source {renderers} />
