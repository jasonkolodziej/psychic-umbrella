<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { classNames } from '$lib/editable/util';
	import { Button, Modal } from 'flowbite-svelte';

	// Only relevant for mobile
	export let position = 'bottom';
	let open: boolean;

	const dispatch = createEventDispatcher();
	let surface: EventTarget;
	onMount(async () => {
		// window.document.children[0].style = 'overflow: hidden;';
		// (window.document.children[0] as HTMLElement).style.overflow = 'hidden';
		(window.document.children[0] as HTMLElement).style.setProperty('overflow', 'hidden');
	});
	onDestroy(() => {
		if (browser) {
			// window.document.children[0].style = '';
			(window.document.children[0] as HTMLElement).style.removeProperty('overflow');
		}
	});
	function onMouseUp(e: Event) {
		if (e.target === surface) dispatch('close');
	}
</script>

<div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

	<!-- svelte-ignore a11y-unknown-role -->
	<div class="fixed inset-0 z-50 overflow-y-auto"  on:mouseup={onMouseUp}>
		<div
			bind:this={surface}
			class={classNames(
				'flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0',
				position === 'bottom' ? 'items-end' : 'items-start'
			)}
		>
			<div
				class="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:max-w-lg"
			>
				<slot />
			</div>
		</div>
	</div>
</div>

<!-- <Modal title="Terms of Service" bind:open autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
	<svelte:fragment slot="footer">
	  <Button on:click={() => alert('Handle "success"')}>I accept</Button>
	  <Button color="alternative">Decline</Button>
	</svelte:fragment>
  </Modal> -->