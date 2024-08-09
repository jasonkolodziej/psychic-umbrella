<script lang="ts">
	export let article;
	export let firstEntry;
	import { classNames } from '$lib/editable/util';
	import SecondaryButton from './SecondaryButton.svelte';
</script>

<div>
	<div
		class={classNames(
			'mx-auto max-w-screen-md px-6 md:text-xl',
			firstEntry ? 'pb-8 pt-2 sm:pb-12' : 'py-6 sm:py-10'
		)}
	>
		<div class={classNames(article.published_at ? '' : 'opacity-50')}>
			<div>
				<a
					class={classNames('mb-12 text-2xl font-bold md:text-3xl')}
					href={`/blog/${article.slug}`}
				>
					{article.title}
				</a>
			</div>
			<div class="pb-4 pt-2">
				<div class="line-clamp-4">
					<a href={`/blog/${article.slug}`}>
						{article.teaser}
					</a>
				</div>
			</div>
		</div>
		<div class="pt-2">
			<SecondaryButton size="sm" href={`/blog/${article.slug}`}>
				Continue reading&nbsp;→
			</SecondaryButton>
		</div>
	</div>
</div>
