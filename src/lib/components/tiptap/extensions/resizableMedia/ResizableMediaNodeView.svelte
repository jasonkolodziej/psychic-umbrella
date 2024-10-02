<script setup lang="ts">
	// import { Editor, Node, NodeViewWrapper } from '@tiptap/vue-3'
	import { Editor, Node, type NodeViewProps } from '@tiptap/core';
	import cx from 'clsx';
	import { NodeViewWrapper } from 'svelte-tiptap';
	// import { ref, onMounted, computed, watch } from 'vue'
	import {
		onMount,
		onDestroy,
		createEventDispatcher,
		setContext,
		getContext,
		hasContext
	} from 'svelte';
	import { Tooltip } from 'flowbite-svelte';
	import { Node as ProseMirrorNode } from 'prosemirror-model';
	import { Decoration } from 'prosemirror-view';

	// import InlineSvg from 'vue-inline-svg'

	import { resizableMediaActions } from './resizableMediaUtil';
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { twJoin, twMerge } from 'tailwind-merge';
	const dispatch = createEventDispatcher<{
		loaded: null;
		// clicked: number,
		// update: JSONContent;
	}>();

	type $$Props = HTMLAttributes<HTMLImageElement> &
		HTMLAttributes<HTMLVideoElement> &
		NodeViewProps & {
			editor: Editor;
			extension: Node<any, any>;
		};
	interface WidthAndHeight {
		width: number;
		height: number;
	}

	export let editor: $$Props['editor'];
	export let node: $$Props['node'] = $$props.node;
	export let updateAttributes: $$Props['updateAttributes'];
	// export let updateAttributes: NodeViewProps['updateAttributes'];
	let deleteNode: $$Props['deleteNode'];
	const mediaType: 'img' | 'video' = $$props.node.attrs['media-type'] as 'img' | 'video';
	let isFloat: boolean = $$props.node.attrs.dataFloat ?? false;
	let isAlign: boolean = $$props.node.attrs.dataAlign ?? false;

	let nodeViewClass = cx('media-node-view', 'flex', 'pos-relative', 'not-prose', {
		[`f-${$$props.node.attrs.dataFloat}`]: isFloat,
		[`align-${$$props.node.attrs.dataAlign}`]: isAlign
	});

	let resizableMedia: HTMLImageElement | HTMLVideoElement;
	let floatingMenu: HTMLElement;

	let deep: boolean;

	let aspectRatio = 0;
	let proseMirrorContainerWidth = 0;
	let isHorizontalResizeActive = false;
	let horizontalResizeClass: string;
	let lastCursorX = -1;
	let isVerticalResizeActive = false;
	let verticalResizeClass: string;
	let lastCursorY = -1;
	let mediaClass: string;
	// const mediaActionActiveState = ref<Record<string, boolean>>({})
	//? https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/main/src/06-state-management/02-context-inline/Usage..svelte
	let mediaActionActiveState: Record<string, boolean>;

	let className: $$Props['class'] = undefined;
	export { className as class };

	const setMediaActionActiveStates = () => {
		const activeStates: Record<string, boolean> = {};

		for (const { tooltip, isActive } of resizableMediaActions) {
			activeStates[tooltip] = !!isActive?.($$props.node.attrs);
		}

		// mediaActionActiveState.value = activeStates;
		mediaActionActiveState = activeStates;
		// setContext<Record<string, boolean>>('mediaActionActiveState', activeStates);
	};
	// watch(
	// 	// () => props.node.attrs,
	// 	() => $$props.node.attrs,
	// 	() => setMediaActionActiveStates(),
	// 	{ deep: true }
	// );
	// if (hasContext('mediaActionActiveState')) {
	// 	// do something
	// 	deep = true;
	// }
	// mediaActionActiveState = getContext<Record<string, boolean>>('mediaActionActiveState');
	// if (hasContext('mediaActionActiveState')) {

	const limitWidthOrHeightToFiftyPixels = ({ width, height }: WidthAndHeight) =>
		width < 100 || height < 100;

	const startHorizontalResize = (e: MouseEvent) => {
		isHorizontalResizeActive = true;
		lastCursorX = e.clientX;

		document.addEventListener('mousemove', onHorizontalMouseMove);
		document.addEventListener('mouseup', stopHorizontalResize);
	};

	const stopHorizontalResize = () => {
		isHorizontalResizeActive = false;
		lastCursorX = -1;

		document.removeEventListener('mousemove', onHorizontalMouseMove);
		document.removeEventListener('mouseup', stopHorizontalResize);
	};

	const onHorizontalResize = (directionOfMouseMove: 'right' | 'left', diff: number) => {
		if (!resizableMedia) {
			console.error('Media ref is undefined|null', { resizableMedia });
			return;
		}

		const currentMediaDimensions = { width: resizableMedia.width, height: resizableMedia.height };

		const newMediaDimensions = { width: -1, height: -1 };

		if (directionOfMouseMove === 'left') {
			newMediaDimensions.width = currentMediaDimensions.width - Math.abs(diff);
		} else {
			newMediaDimensions.width = currentMediaDimensions.width + Math.abs(diff);
		}

		if (newMediaDimensions.width > proseMirrorContainerWidth) {
			newMediaDimensions.width = proseMirrorContainerWidth;
		}

		newMediaDimensions.height = newMediaDimensions.width / aspectRatio;

		if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

		updateAttributes(newMediaDimensions);
	};

	const onHorizontalMouseMove = (e: MouseEvent) => {
		if (!isHorizontalResizeActive) return;
		const { clientX } = e;
		const diff = lastCursorX - clientX;
		lastCursorX = clientX;
		if (diff === 0) return;
		const directionOfMouseMove: 'left' | 'right' = diff > 0 ? 'left' : 'right';
		onHorizontalResize(directionOfMouseMove, Math.abs(diff));
	};

	const startVerticalResize = (e: MouseEvent) => {
		// isVerticalResizeActive.value = true;
		isVerticalResizeActive = true;
		// lastCursorY.value = e.clientY;
		lastCursorY = e.clientY;
		document.addEventListener('mousemove', onVerticalMouseMove);
		document.addEventListener('mouseup', stopVerticalResize);
	};

	const stopVerticalResize = () => {
		// isVerticalResizeActive.value = false;
		isVerticalResizeActive = false;
		// lastCursorY.value = -1;
		lastCursorY = -1;
		document.removeEventListener('mousemove', onVerticalMouseMove);
		document.removeEventListener('mouseup', stopVerticalResize);
	};

	const onVerticalMouseMove = (e: MouseEvent) => {
		if (!isVerticalResizeActive) return;

		const { clientY } = e;
		const diff = lastCursorY - clientY;
		lastCursorY = clientY;

		if (diff === 0) return;

		const directionOfMouseMove: 'up' | 'down' = diff > 0 ? 'up' : 'down';

		if (!resizableMedia) {
			console.error('Media ref is undefined|null', { resizableMedia });
			return;
		}

		const currentMediaDimensions = { width: resizableMedia.width, height: resizableMedia.height };
		const newMediaDimensions = { width: -1, height: -1 };

		if (directionOfMouseMove === 'up') {
			newMediaDimensions.height = currentMediaDimensions.height - Math.abs(diff);
		} else {
			newMediaDimensions.height = currentMediaDimensions.height + Math.abs(diff);
		}

		newMediaDimensions.width = newMediaDimensions.height * aspectRatio;

		if (newMediaDimensions.width > proseMirrorContainerWidth) {
			newMediaDimensions.width = proseMirrorContainerWidth;
			newMediaDimensions.height = newMediaDimensions.width / aspectRatio;
		}

		if (limitWidthOrHeightToFiftyPixels(newMediaDimensions)) return;

		updateAttributes(newMediaDimensions);
	};

	const mediaSetupOnLoad = () => {
		// ! TODO: move this to extension storage
		const proseMirrorContainerDiv = document.querySelector('.ProseMirror');

		if (proseMirrorContainerDiv) proseMirrorContainerWidth = proseMirrorContainerDiv?.clientWidth;

		// When the media has loaded
		if (!resizableMedia) return;

		// if (mediaType.value === 'video') {
		if (mediaType === 'video') {
			// Aspect Ratio from its original size
			setTimeout(() => {
				aspectRatio =
					(resizableMedia as HTMLVideoElement).videoWidth /
					(resizableMedia as HTMLVideoElement).videoHeight;

				// for the first time when video is added with custom width and height
				// and we have to adjust the video height according to it's width
				onHorizontalResize('left', 0);
			}, 200);
		} else {
			// resizableMedia.value.onload = () => {
			resizableMedia.onload = () => {
				// Aspect Ratio from its original size
				aspectRatio =
					(resizableMedia as HTMLImageElement).naturalWidth /
					(resizableMedia as HTMLImageElement).naturalHeight;

				onHorizontalResize('left', 0);
			};
		}

		setTimeout(() => setMediaActionActiveStates(), 200);
	};

	onMount(() => mediaSetupOnLoad());

	$: if ($$props.node.attrs) {
		setMediaActionActiveStates();
		// do something
		deep = true;
	}
	$: {
		isFloat = $$props.node.attrs.dataFloat ?? false;
		isAlign = $$props.node.attrs.dataAlign ?? false;
		nodeViewClass = cx('media-node-view', 'flex', 'pos-relative', 'not-prose', {
			[`f-${$$props.node.attrs.dataFloat}`]: isFloat,
			[`align-${$$props.node.attrs.dataAlign}`]: isAlign
		});
		horizontalResizeClass = twJoin(
			'horizontal-resize-handle',
			(isHorizontalResizeActive && 'horizontal-resize-active') || ''
		);
		verticalResizeClass = twJoin(
			'vertical-resize-handle',
			(isVerticalResizeActive && 'vertical-resize-active') || ''
		);
		mediaClass = twMerge(
			'rounded-lg',
			(isFloat && `float-${$$props.node.attrs.dataFloat}`) || '',
			(isAlign && `align-${$$props.node.attrs.dataAlign}`) || ''
		);
	}

	console.log('ResizeableMedia', { mediaType, node, isAlign, isFloat });
</script>

<NodeViewWrapper as="article" bind:class={nodeViewClass}>
	<!-- <tippy :interactive="true"> -->
	<div class="relative flex w-fit">
		{#if mediaType === 'img'}
			<!-- 				class:float-{$$props.node.attrs.dataFloat}
				class:align-{$$props.node.attrs.dataAlign} -->
			<!-- <img bind:this={resizableMedia} class="rounded-lg" draggable="true" />
			 -->
			<svelte:element
				this={mediaType}
				bind:this={resizableMedia}
				class={mediaClass}
				draggable="true"
				{...$$props.node.attrs}
			/>
		{:else if mediaType === 'video'}
			<!-- 				class:float-{$$props.node.attrs.dataFloat}
				class:align-{$$props.node.attrs.dataAlign} -->
			<!-- <video bind:this={resizableMedia} class="rounded-lg" draggable="true" controls="true"> -->
			<svelte:element
				this={mediaType}
				bind:this={resizableMedia}
				class={mediaClass}
				draggable="true"
				controls={true}
			>
				<source src={node.attrs.src} />
			</svelte:element>
		{/if}

		<div
			class={horizontalResizeClass}
			title="Resize"
			aria-label="Resize horizontally"
			on:mousedown={startHorizontalResize}
			on:mouseup={stopHorizontalResize}
		/>
		<!-- class:vertical-resize-active={isVerticalResizeActive} -->
		<div
			class={verticalResizeClass}
			title="Resize"
			on:mousedown={startVerticalResize}
			on:mouseup={stopVerticalResize}
		/>
	</div>

	<!-- {#if editor && editor.isActive('resizableMedia')}
		<ButtonGroup class="image-actions-container">
			{#each resizableMediaActions as mediaAction, i}
				<Button
					class="btn btn-sm btn-ghost image-action-button"
					on:click={() =>
						mediaAction.tooltip === 'Delete'
							? mediaAction.delete?.(deleteNode)
							: mediaAction.action?.(updateAttributes)}
				>
					<svelte:component this={mediaAction.icon} />
				</Button>
				<Tooltip>{mediaAction.tooltip}</Tooltip>
			{/each}
		</ButtonGroup>
	{/if} -->
	<!-- </svelte:element> -->
	<!-- </tippy> -->
</NodeViewWrapper>

<!-- <template>
      <node-view-wrapper
        as="article"
        class="media-node-view flex pos-relative not-prose"
        :class="[`${isFloat && `f-${props.node.attrs.dataFloat}` || ''}`, `${isAlign && `align-${props.node.attrs.dataAlign}` || ''}`]"
      > -->
<!-- <tippy :interactive="true"> -->
<!-- <div class="w-fit flex relative">
            <img
              v-if="mediaType === 'img'"
              v-bind="node.attrs"
              ref="resizableImg"
              class="rounded-lg"
              :class="[`${isFloat && `float-${props.node.attrs.dataFloat}` || ''}`, `${isAlign && `align-${props.node.attrs.dataAlign}` || ''}`]"
              draggable="true"
            >
    
            <video
              v-else-if="mediaType === 'video'"
              v-bind="node.attrs"
              ref="resizableImg"
              class="rounded-lg"
              :class="[`${isFloat && `float-${props.node.attrs.dataFloat}` || ''}`, `${isAlign && `align-${props.node.attrs.dataAlign}` || ''}`]"
              draggable="true"
              controls="true"
            >
              <source :src="node.attrs.src">
            </video> -->

<!-- <div
              class="horizontal-resize-handle"
              :class="{ 'horizontal-resize-active': isHorizontalResizeActive }"
              title="Resize"
              @mousedown="startHorizontalResize"
              @mouseup="stopHorizontalResize"
            />
    
            <div
              class="vertical-resize-handle"
              :class="{ 'vertical-resize-active': isVerticalResizeActive }"
              title="Resize"
              @mousedown="startVerticalResize"
              @mouseup="stopVerticalResize"
            /> -->
<!-- </div> -->

<!-- <template #content>
            <section class="image-actions-container">
              <button
                v-for="(mediaAction, i) in resizableMediaActions"
                :key="i"
                v-tippy="{ content: mediaAction.tooltip, placement: 'top' }"
                :content="mediaAction.tooltip"
                class="btn btn-sm btn-ghost image-action-button"
                @click="mediaAction.tooltip === 'Delete'
                  ? mediaAction.delete?.(deleteNode)
                  : mediaAction.action?.(updateAttributes)
                "
              >
                <InlineSvg :src="mediaAction.icon" />
              </button>
            </section>
          </template> -->
<!-- </tippy> -->
<!-- </node-view-wrapper>
    </template> -->
