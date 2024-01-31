<script lang="ts">
	import Archive from '$lib/components/Archive/Archive.svelte';

	export let data;
</script>

<main class="mt-4 flex w-full flex-col place-items-center">
	<div class="place-self-start pl-4 lg:place-self-center lg:p-0">
		<Archive archive={data.archive} />
	</div>
</main>
