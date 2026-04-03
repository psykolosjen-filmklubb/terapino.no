<script lang="ts">
	import type { MemberSummary } from "$lib/types/member";
	import MemberTag from "./MemberTag.svelte";

	interface Props {
		authors: MemberSummary[];
		heading?: string;
	}

	let { authors, heading = "" }: Props = $props();
</script>

<div class="w-full">
	{#if heading !== ""}
		<h3 class="text-sm font-light tracking-tight">{heading}</h3>
	{/if}
	<div class="grid gap-4">
		{#each authors as author}
			<MemberTag member={author} />
		{/each}
	</div>
</div>
