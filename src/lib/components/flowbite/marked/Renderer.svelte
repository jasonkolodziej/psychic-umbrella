<script lang="ts">
	import Markdown from '@magidoc/plugin-svelte-marked';
	import Img from '$components/flowbite/marked/typeography/Img.svelte';

	let source = `
  # Setup
  Here are the steps to set up svelte-marked plugin
  1. Install it
  2. Enjoy
      - If you enjoyed, make sure to star the repo!
Amazing image:
![Look at this image](https://lh3.googleusercontent.com/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc=w600)
  `;

	const renderers = {
		img: Img
	};
</script>

<Markdown bind:source {renderers} />
