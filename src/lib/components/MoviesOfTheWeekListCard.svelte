<script lang="ts">
	import { resolve } from "$app/paths";
	import { Button } from "$lib/components/ui/button";
	import MemberAvatar from "$lib/components/MemberAvatar.svelte";
	import * as Card from "$lib/components/ui/card";
	import type { MovieOfTheWeek } from "$lib/sanity/api/getAllMoviesOfTheWeek";

	type Props = MovieOfTheWeek & {
		posterUrl: string | null;
	};

	let { movie, slug, recommender, weekNumber, year, posterUrl }: Props = $props();
</script>

<Card.Root class="squircle max-w-lg gap-4 p-0">
	{#if posterUrl}
		<Card.Header class="gap-0 p-0">
			<Button
				variant="ghost"
				href={resolve("/movie-of-the-week/[slug]", { slug: slug.current })}
				class="h-auto flex-col items-baseline p-0"
			>
				<img
					src={posterUrl}
					alt="Plakat for {movie.title}"
					class="squircle-top aspect-2/1 w-full rounded-t-2xl object-cover object-[50%_30%]"
					style:--vt-tag="MOTW-poster-{slug.current}"
				/>
			</Button>
		</Card.Header>
	{/if}

	<Card.Content class="mb-4">
		<Button
			variant="link"
			href={resolve("/movie-of-the-week/[slug]", { slug: slug.current })}
			class="mb-2 h-auto scroll-m-20 flex-col items-baseline p-0 text-xl font-bold tracking-tight whitespace-normal lg:text-2xl"
		>
			<span class="movie-of-the-week-title" style:--vt-tag="MOTW-title-{slug.current}">
				{movie.title}
			</span>
		</Button>
	</Card.Content>

	<Card.Footer class="mt-auto mb-3.5 flex items-center justify-between">
		<span class="flex items-center gap-1.5">
			<MemberAvatar member={recommender} avatarClass="size-13" />
			{recommender.name}
		</span>
		<span>
			Uke {weekNumber}, {year}
		</span>
	</Card.Footer>
</Card.Root>
