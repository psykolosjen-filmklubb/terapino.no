<script lang="ts">
	import Archive from '$lib/components/Archive/Archive.svelte';

	export let data;
</script>

<div class="mt-4 w-full">
	<Archive archive={data.archive} />
</div>
