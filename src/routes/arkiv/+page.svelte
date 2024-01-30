<script lang="ts">
	import Archive from '$lib/components/Archive.svelte';

	export let data;
</script>

<main class="flex w-full flex-col place-items-center">
	<h1
		class="scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-left lg:text-5xl"
	>
		Arkiv
	</h1>
	<div class="place-self-start pl-4 lg:place-self-center lg:p-0">
		<Archive archive={data.archive} />
	</div>
</main>
