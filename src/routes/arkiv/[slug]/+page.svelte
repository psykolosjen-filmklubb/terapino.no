<script lang="ts">
	import AuthorList from '$lib/components/AuthorList.svelte';
	import PosterImage from '$lib/components/PosterImage.svelte';

	export let data;

	let dateFormatter = Intl.DateTimeFormat('no', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	$: screening = data.screening;
</script>

<div class="grid lg:grid-cols-2">
	<div class="mb-4 flex flex-col items-center text-center lg:mt-10">
		<p class="text-l text-muted-foreground">Psykolosjen Filmklubb viste</p>
		<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
			{data.screening.movie_title}
		</h1>
		<p class="text-l text-muted-foreground">{dateFormatter.format(new Date(screening.date))}</p>
	</div>

	{#if screening.poster}
		<div class="lg:order-first lg:row-span-3">
			<PosterImage poster={screening.poster} posterBlurhash={screening.posterBlurhash} />
		</div>
	{/if}
	{#if screening.posterArtists}
		<div class="p-2 lg:col-start-2 lg:row-start-3 lg:mb-4">
			<AuthorList authors={screening.posterArtists} heading="Plakat av:" />
		</div>
	{/if}
</div>
