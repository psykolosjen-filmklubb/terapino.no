<script lang="ts">
	import type { Member } from "$lib/sanity/api/getReviewExcerpts";
	import type { PortableTextBlock } from "@sanity/types";
	import MovieOfTheWeekCard from "./MovieOfTheWeekCard.svelte";

	interface Props {
		movieTitle: string;
		slug: string;
		text?: PortableTextBlock[];
		weekNumber: number;
		recommender: Member;
		poster: string;
	}

	let { movieTitle, slug, text, weekNumber, recommender, poster }: Props = $props();
</script>

<section class="flex w-full flex-col px-2 py-8 lg:items-center lg:px-6">
	<h2
		class="mb-8 scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors lg:text-left lg:text-5xl lg:font-bold"
	>
		Ukens film
	</h2>

	<MovieOfTheWeekCard movie_title={movieTitle} {slug} {text} {poster} {weekNumber} {recommender}
	></MovieOfTheWeekCard>
</section>
