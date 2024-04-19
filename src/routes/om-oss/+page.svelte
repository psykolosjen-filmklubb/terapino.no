<script>
	import AuthorList from '$lib/components/AuthorList.svelte';
	import HeroImage from '$lib/components/HeroImage.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data;
</script>

<HeroImage
	thumbnail={data.content.header_image.asset}
	thumbnailBlurhash={data.content.header_image.blurhash}
/>

<article class="prose mx-auto mt-8 px-8 dark:prose-invert lg:prose-lg lg:px-0">
	<PortableText value={data.content.main_text} />
</article>

<article class="my-8 px-8 lg:mx-auto lg:max-w-screen-sm">
	<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
		Styret:
	</h2>
	<AuthorList authors={data.styret} />
</article>
