<script lang="ts">
	import { PortableText } from '@portabletext/svelte';

	export let data;

	$: console.log(data);
</script>

<h1 class="scroll-m-20 pb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
	{data.review.review_title}
</h1>
<div class="max-w-lg">
	<PortableText value={data.review.review} />
</div>
<footer class="flex w-full max-w-lg justify-end">
	<p class="italic">
		Skrevet av: {#each data.review.authors as author}
			{author.name}
		{/each}
	</p>
</footer>
