<script lang="ts">
	import type { ImageAsset } from '@sanity/types';
	import MemberTag from './MemberTag.svelte';

	interface Props {
		authors: Member[];
		heading?: string;
	}

	export type Member = {
		name: string;
		image: ImageAsset;
	};

	let { authors, heading = '' }: Props = $props();
</script>

<div class="w-full">
	{#if heading !== ''}
		<h3 class="text-sm font-light tracking-tight">{heading}</h3>
	{/if}
	<div class="grid gap-4">
		{#each authors as author}
			<MemberTag member={author} />
		{/each}
	</div>
</div>
