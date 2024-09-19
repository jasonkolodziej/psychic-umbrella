<script lang="ts">
	import Post from '$components/using/flowbite/blog/ui/post/Post.svelte';
	import type { ComponentEvents } from 'svelte';
	import type { PageData } from './$types';
	// import blog from './blog-example.json';
	// import comments from './comments-example.json';
	export let data: PageData;
	let { profile } = data;
	type UpdatedEventType = ComponentEvents<Post>['updated'];
	const handleUpdated = ({ detail }: UpdatedEventType) => {
		console.log(detail);
	};
</script>

<Post bind:blog={profile} on:updated={handleUpdated} />
