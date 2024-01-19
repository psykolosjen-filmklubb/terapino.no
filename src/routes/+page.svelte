<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { urlFor } from '$lib/utils/image';

	export let data;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
	Psykolosjen Filmklubb
</h1>

<img src={urlFor(data.logo.image).width(384).height(384).url()} alt="Logo" class="mb-12 mt-4" />

{#if data.reviews}
	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Filmanmeldelser
	</h2>
	{#each data.reviews as review}
		<Button variant="link" href="/{review.slug.current}" class="scroll-m-20 text-xl tracking-tight">
			{review.review_title}
		</Button>
	{/each}
{/if}
