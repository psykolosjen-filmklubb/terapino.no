<script lang="ts">
	import MembershipsAndVerv from "$lib/components/MembershipsAndVerv.svelte";
	import PosterGallery from "$lib/components/PosterGallery.svelte";
	import * as Avatar from "$lib/components/ui/avatar";
	import { urlFor } from "$lib/sanity/image";
	import * as Card from "$lib/components/ui/card";

	let { data } = $props();

	let nameList = $derived(data.member.name.split(" "));
	let fallback = $derived(nameList[0].substring(0, 1) + nameList.slice(-1)[0].substring(0, 1));
</script>

<h1
	class="my-2 scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl"
	style:--vt-tag="member-name-{data.member.name.replace(' ', '-').toLowerCase()}"
>
	{data.member.name}
</h1>

<Avatar.Root class="mx-auto my-2 size-48">
	{#if data.member.image}
		<Avatar.Image src={urlFor(data.member.image).width(384).height(384).url()} />
	{/if}
	<Avatar.Fallback>
		{fallback}
	</Avatar.Fallback>
</Avatar.Root>

{#if data.member.memberships}
	<article class="my-2 w-full px-4">
		<MembershipsAndVerv memberships={data.member.memberships} verv={data.member.verv ?? []} />
	</article>
{/if}

{#if data.posters.length > 0}
	<article class="my-8 w-full px-4 lg:my-12">
		<h2
			class="mb-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 lg:text-3xl"
		>
			Plakater
		</h2>
		<PosterGallery galleryID="posters-gallery" posters={data.posters} />
	</article>
{/if}

{#if data.reviews.length > 0}
	<article class="my-8 w-full px-4 lg:my-12">
		<h2
			class="mb-2 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 lg:text-3xl"
		>
			Anmeldelser
		</h2>
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
			{#each data.reviews as review}
				<a href={`/anmeldelser/${review.slug.current}`} class="group">
					<Card.Root>
						<Card.Content>
							<Card.Title class="group-hover:underline">
								{review.review_title}
							</Card.Title>
							<Card.Description class="group-hover:underline">
								{review.movie_title}
							</Card.Description>
						</Card.Content>
					</Card.Root>
				</a>
			{/each}
		</div>
	</article>
{/if}
