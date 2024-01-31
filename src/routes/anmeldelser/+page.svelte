<script lang="ts">
	import ReviewExcerptCard from '$lib/components/ReviewExcerptCard.svelte';

	export let data;
</script>

<h1
	class="mb-8 mt-4 scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-left lg:text-5xl"
>
	Psykolosjen Filmklubbs Filmanmeldelser
</h1>

<section class="grid grid-cols-1 gap-10 px-4 lg:grid-cols-3 lg:px-10">
	{#each data.reviews as review}
		<ReviewExcerptCard {review} />
	{/each}
</section>
