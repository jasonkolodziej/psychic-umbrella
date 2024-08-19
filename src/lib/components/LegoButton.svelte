<script lang="ts">
	import { Button } from 'flowbite-svelte';
	const clicked = () => {
		alert('You clicked btn1.');
	};
	export let label: string;
	// export let color: string = 'default';
</script>

<div class="grid grid-cols-1">
	<div id="brick-wrapper">
		<!-- <div class="brick"> -->
		<Button class="button" on:click={clicked} color="primary">
			{label}
			<div class="bits">
				<div class="bit" />
				<div class="bit" />
				<div class="bit" />
				<div class="bit" />
			</div>
		</Button>
		<!-- </div> -->
	</div>

	<div id="brick-wrap-2">
		<div class="brick-2">
			<div class="bits-2">
				<div class="bit-2" />
				<div class="bit-2" />
				<div class="bit-2" />
				<div class="bit-2" />
			</div>
		</div>
	</div>
</div>

<!-- <div id="brick-wrap"> -->
<!-- <div class="brick-wrapper">
	<div class="brick" id="red">
		<div class="bits">
			<div class="bit"></div>
			<div class="bit"></div>
			<div class="bit"></div>
			<div class="bit"></div>
		</div>
	</div>
</div> -->

<!-- <div id="brick-wrap-2">
	<div class="brick-2" id="green">
		<div class="bits-2">
			<div class="bit-2"></div>
			<div class="bit-2"></div>
			<div class="bit-2"></div>
			<div class="bit-2"></div>
		</div>
	</div>
</div> -->

<style lang="css">
	#brick-wrapper {
		cursor: pointer !important;
		z-index: 10;
		transform: perspective(1050px) translate3d(0px, 0px, 150px) rotateX(-10deg) scale(0.9, 0.9);
		box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
		transition: 0.4s ease-in-out transform;
		position: relative;
		display: block;
		/* width: 124px; */
		width: inherit;
		padding-bottom: 8px;
		overflow: hidden;
	}

	#brick-wrapper:hover {
		cursor: pointer !important;
		/* transform: translate3d(0px, 5px, -150px); */
		transform: translate3d(0px, 9px, -150px);
	}

	.brick {
		cursor: pointer !important;
		width: inherit;
		height: inherit;
		/* width: 124px; */
		/* height: 28px; */
		display: block;
		border-radius: 2px;
		top: 8px;
		position: relative;
		background: inherit;
		/* background: #000; */
		display: flex;
		justify-content: center;
		padding-top: 0.25rem !important;
		padding-bottom: 0.25rem !important;
	}

	.bits {
		position: absolute;
		/* top: -8px; */
		/* top: 0.005%; */
		top: -8px;
	}

	.bit {
		width: 13px;
		height: 8px;
		display: block;
		/* background: var(--bg-color); */
		background: #000;
		position: relative;
		float: left;
		margin: 0 6px;
		border-radius: 2px 2px 0 0;
	}

	#brick-wrap-2 {
		position: relative;
		display: block;
		/* width: 124px; */
		width: 125px;
		padding-bottom: 8px;
		overflow: hidden;
		justify-content: center;
	}

	.brick-2 {
		/* width: 124px; */
		width: inherit;
		height: 10px;
		display: block;
		border-radius: 2px;
		/* border-radius: var(--lego); */
		margin: 0 6px;
		top: 5px;
		position: relative;
		justify-content: center;
		background: #eb4f27;
		/* background: #000; */
	}

	.bits-2 {
		position: absolute;
		/* justify-content: center; */
		/* position: sticky; */
		top: -4px;
	}

	.bit-2 {
		/* width: 19px; */
		width: 13px;
		height: 4px;
		display: block;
		/* background: #000; Changed to green for id="green" */
		background: #eb4f27;
		position: relative;
		float: left;
		margin: 0 6px;
		border-radius: 2px 2px 0 0;
	}
</style>
