<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { urlFor } from '$lib/utils/image';
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
<footer class="flex w-full max-w-lg justify-end pt-4">
	<p class="italic">
		{#each data.review.authors as author}
			<Avatar.Root>
				<Avatar.Image src={urlFor(author.image).width(64).height(64).url()}></Avatar.Image>
				<Avatar.Fallback>{author.name}</Avatar.Fallback>
			</Avatar.Root>
		{/each}
	</p>
</footer>
