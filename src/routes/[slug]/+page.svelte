<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { urlFor } from '$lib/utils/image';
	import { PortableText } from '@portabletext/svelte';

	export let data;

	let dateFormatter = Intl.DateTimeFormat('no', {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric'
	});
</script>

<img src={urlFor(data.review.thumbnail).width(2048).height(1024).url()} alt="Logo" class="w-full" />

<header class="mt-8 px-6 pb-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{data.review.review_title}
	</h1>
	<small>Film: {data.review.movie_title}</small>
</header>

<div class="mb-8 grid gap-12 px-6 lg:grid-cols-3 lg:gap-8">
	<div class="lg:col-span-2">
		<PortableText value={data.review.review} />
	</div>

	{#if data.review.authors}
		<div class="lg:px-6">
			<h3 class="text-sm font-light tracking-tight">Skrevet av:</h3>
			<div class="grid gap-4">
				{#each data.review.authors as author}
					<div class="flex w-full justify-between">
						<p class="text-xl font-light tracking-tight">{author.name}</p>
						<Avatar.Root class="size-16">
							<Avatar.Image src={urlFor(author.image).width(128).height(128).url()}></Avatar.Image>
							<Avatar.Fallback>{author.name}</Avatar.Fallback>
						</Avatar.Root>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if data.movieDetails}
		<div>
			<h3 class="text-sm font-light tracking-tight">Om filmen</h3>
			<p>Originaltittel: {data.movieDetails.original_title}</p>
			<p>Slippdato: {dateFormatter.format(new Date(data.movieDetails.release_date))}</p>
			<p>
				Reggisør{data.movieDetails.directors.length > 1 ? 'er' : ''}: {data.movieDetails.directors.join(
					', '
				)}
			</p>
		</div>
	{/if}
</div>
