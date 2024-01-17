<script lang="ts">
	import { PortableText } from '@portabletext/svelte';

	export let data;

	$: review = data.reviews[0].review;
</script>

<h1>Psykolosjen Filmklubb</h1>

{#if data.authors && data.authors.length > 0}
	<h2>Forfattere:</h2>
	{#each data.authors as author}
		{author.name}
	{/each}
{:else}
	<p>No authors found</p>
{/if}

{#if data.reviews && data.reviews.length > 0}
	<PortableText value={review} />
{/if}
