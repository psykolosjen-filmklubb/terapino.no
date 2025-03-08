<script lang="ts">
	import ReviewExcerptCard from '$lib/components/ReviewExcerptCard.svelte';

	let { data } = $props();
</script>

<section class="mt-4 grid grid-cols-1 gap-10 px-4 lg:mt-10 lg:grid-cols-3 lg:px-10">
	{#each data.reviews as review}
		<ReviewExcerptCard {...review} />
	{/each}
</section>
