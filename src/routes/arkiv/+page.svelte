<script lang="ts">
	import Archive from "$lib/components/Archive/Archive.svelte";
	import { ArchiveState } from "$lib/components/Archive/ArchiveState.svelte.js";

	let { data } = $props();

	const archive = new ArchiveState(data.archive);
</script>

<div class="mt-4 w-full">
	<Archive {archive} />
</div>
