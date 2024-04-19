<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import type { Member } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';

	export let authors: Member[];
	export let heading: string | undefined;
</script>

<div class="w-full">
	{#if heading}
		<h3 class="text-sm font-light tracking-tight">{heading}</h3>
	{/if}
	<div class="grid gap-4">
		{#each authors as author}
			{@const nameList = author.name.split(' ')}
			<div class="flex items-center justify-between">
				<p class="text-xl font-light tracking-tight">{author.name}</p>
				<Avatar.Root class="size-16">
					{#if author.image}
						<Avatar.Image src={urlFor(author.image).width(128).height(128).url()} />
					{/if}
					<Avatar.Fallback>
						{nameList[0].substring(0, 1) + nameList.slice(-1)[0].substring(0, 1)}
					</Avatar.Fallback>
				</Avatar.Root>
			</div>
		{/each}
	</div>
</div>
