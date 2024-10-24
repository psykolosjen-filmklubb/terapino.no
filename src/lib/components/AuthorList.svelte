<script lang="ts">
	import type { Member } from '$lib/sanity/types';
	import MemberTag from './MemberTag.svelte';

	export let authors: Member[];
	export let heading = '';
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
