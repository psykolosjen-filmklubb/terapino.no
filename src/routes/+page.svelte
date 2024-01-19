<script lang="ts">
	import { urlFor } from '$lib/utils/image';
	import { PortableText } from '@portabletext/svelte';

	export let data;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
	Psykolosjen Filmklubb
</h1>

<img src={urlFor(data.logo.image).width(384).height(384).url()} alt="Logo" />

{#if data.reviews}
	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Filmanmeldelser
	</h2>
	{#each data.reviews as review}
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">{review.review_title}</h3>
		<PortableText value={review.review} />
	{/each}
{/if}
