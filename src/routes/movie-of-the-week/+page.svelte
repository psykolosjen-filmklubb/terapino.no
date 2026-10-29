<script lang="ts">
	import MoviesOfTheWeekListCard from "$lib/components/MoviesOfTheWeekListCard.svelte";

	let { data } = $props();
</script>

<section class="mt-4 grid grid-cols-1 gap-10 px-4 lg:mt-10 lg:grid-cols-3 lg:px-10">
	{#each data.moviesOfTheWeek as movieOfTheWeek (movieOfTheWeek.slug.current)}
		<MoviesOfTheWeekListCard {...movieOfTheWeek} />
	{/each}
</section>
