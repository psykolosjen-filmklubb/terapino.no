<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import MemberAvatar from "$lib/components/MemberAvatar.svelte";
	import * as Card from "$lib/components/ui/card";
	import type { MemberSummary } from "$lib/types/member";
	import type { PortableTextBlock } from "@sanity/types";
	import { PortableText } from "@portabletext/svelte";

	type Props = {
		movie_title: string;
		slug: string;
		text?: PortableTextBlock[];
		poster: string;
		recommender: MemberSummary;
		weekNumber: number;
	};

	let { movie_title, slug, text, poster, recommender, weekNumber }: Props = $props();
</script>

<Card.Root class="squircle max-w-lg gap-4 p-0">
	<Button
		variant="ghost"
		href="/movie-of-the-week/{slug}"
		class="h-auto flex-col items-baseline p-0"
	>
		<Card.Header class="mt-2.5 w-full">
			<h3
				class="scroll-m-20 text-center text-2xl font-semibold tracking-tight text-wrap"
				style:--vt-tag="MOTW-title-{slug}"
			>
				{movie_title}
			</h3>
		</Card.Header>
		<Card.Content class="mb-4 grid grid-cols-2 gap-2.5">
			<figure>
				<img
					src="https://image.tmdb.org/t/p/w500{poster}"
					alt="poster"
					style:--vt-tag="MOTW-poster-{slug}"
				/>
			</figure>
			<article class="prose dark:prose-invert lg:prose-lg text-wrap">
				<PortableText value={text} />
			</article>
		</Card.Content>
		<Card.Footer class="mt-auto mb-3.5 flex w-full items-center justify-between">
			<span class="flex items-center gap-1.5">
				<MemberAvatar member={recommender} avatarClass="size-13" />
				{recommender.name}
			</span>
			<span>
				Uke {weekNumber}
			</span>
		</Card.Footer>
	</Button>
</Card.Root>
