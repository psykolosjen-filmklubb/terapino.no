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

<p class="text-l mt-2 text-muted-foreground">Psykolosjen Filmklubb viste</p>
<h1 class="scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
	{data.screening.movie_title}
</h1>
<p class="text-l text-muted-foreground">{dateFormatter.format(new Date(screening.date))}</p>

<div class="pt-6">
	{#if screening.poster}
		<PosterImage poster={screening.poster} posterBlurhash={screening.posterBlurhash} />
	{/if}
	{#if screening.posterArtists}
		<div class="p-2">
			<AuthorList authors={screening.posterArtists} heading="Plakat av:" />
		</div>
	{/if}
</div>
