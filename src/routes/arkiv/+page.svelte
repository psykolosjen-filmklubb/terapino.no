<script lang="ts">
	import Archive from '$lib/components/Archive/Archive.svelte';

	let { data } = $props();
</script>

<div class="mt-4 w-full">
	<Archive archive={data.archive} />
</div>
