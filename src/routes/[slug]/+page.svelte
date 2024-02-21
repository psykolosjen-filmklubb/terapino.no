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

	<div class="flex flex-col gap-8 lg:px-6">
		{#if data.review.authors}
			<div>
				<h3 class="text-sm font-light tracking-tight">Skrevet av:</h3>
				<div class="grid gap-4">
					{#each data.review.authors as author}
						<div class="flex w-full justify-between">
							<p class="text-xl font-light tracking-tight">{author.name}</p>
							<Avatar.Root class="size-16">
								<Avatar.Image src={urlFor(author.image).width(128).height(128).url()}
								></Avatar.Image>
								<Avatar.Fallback>{author.name}</Avatar.Fallback>
							</Avatar.Root>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.movieDetails}
			<div>
				<img
					src="http://image.tmdb.org/t/p/w500{data.movieDetails.poster_path}"
					alt="Movie Poster"
				/>
				<p class="text-lg font-light">
					Originaltittel: <span class="font-medium">{data.movieDetails.original_title}</span>
				</p>
				<p class="text-lg font-light">
					Slippdato: <span class="font-medium"
						>{dateFormatter.format(new Date(data.movieDetails.release_date))}</span
					>
				</p>
				<p class="text-lg font-light">
					Reggisør{data.movieDetails.directors.length > 1 ? 'er' : ''}:
					<span class="font-medium">{data.movieDetails.directors.join(', ')}</span>
				</p>
			</div>
		{/if}
	</div>
</div>
