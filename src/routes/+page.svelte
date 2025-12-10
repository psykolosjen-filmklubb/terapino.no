<script lang="ts">
	import ApplyNowSection from "./ApplyNowSection.svelte";
	import NextScreeningSection from "../lib/components/NextScreeningSection.svelte";
	import LatestReviewsSection from "$lib/components/LatestReviewsSection.svelte";
	import MovieOfTheWeek from "$lib/components/MovieOfTheWeek.svelte";

	let { data } = $props();
</script>

{#if data.settings.recruiting.recruiting_active}
	<ApplyNowSection />
{/if}

<NextScreeningSection nextScreening={data.nextScreening} />

{#if data.movieOfTheWeek && data.movieOfTheWeekDetails}
	<MovieOfTheWeek
		movieTitle={data.movieOfTheWeek.movie.title}
		slug={data.movieOfTheWeek.slug.current}
		text={data.movieOfTheWeek.text}
		weekNumber={data.movieOfTheWeek.weekNumber}
		recommender={data.movieOfTheWeek.recommender}
		poster={data.movieOfTheWeekDetails.poster_path}
	/>
{/if}

{#if data.reviews}
	<LatestReviewsSection reviews={data.reviews} />
{/if}
