<script>
	import Limiter from '$lib/components/editable/Limiter.svelte';
	import PrimaryButton from '$lib/components/editable/PrimaryButton.svelte';
	import Input from '$lib/components/editable/Input.svelte';
	export let form;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<Limiter>
	{#if form?.incorrect}
		<p class="my-4 rounded-md bg-red-100 p-4 text-red-600">Login incorrect. Please try again.</p>
	{/if}
	<div class="mb-4 mt-12 flex w-full flex-col space-y-4">
		<form method="POST" class="flex flex-col space-y-8">
			<!-- <div class="flex flex-col">
				<label for="email" class="font-semibold mb-2">E-Mail</label>
				<Input type="text" name="email" id="email" />
			</div> -->
			<div class="flex flex-col">
				<label for="password" class="mb-2 text-2xl font-semibold">Enter Admin password</label>
				<Input type="password" name="password" id="password" />
			</div>
			<PrimaryButton type="submit">Login</PrimaryButton>
			<div><a class="underline" href="/">Return to the homepage</a></div>
		</form>
	</div>
</Limiter>
