<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import type { Author } from '$lib/types';
	import { urlFor } from '$lib/utils/image';

	export let authors: Author[];
	export let heading: string | undefined;
</script>

<div>
	{#if heading}
		<h3 class="text-sm font-light tracking-tight">{heading}</h3>
	{/if}
	<div class="grid gap-4">
		{#each authors as author}
			<div class="flex w-full justify-between lg:justify-start lg:gap-12">
				<p class="text-xl font-light tracking-tight">{author.name}</p>
				<Avatar.Root class="size-16">
					<Avatar.Image src={urlFor(author.image).width(128).height(128).url()} />
					<Avatar.Fallback>{author.name}</Avatar.Fallback>
				</Avatar.Root>
			</div>
		{/each}
	</div>
</div>
