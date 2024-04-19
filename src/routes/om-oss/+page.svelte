<script>
	import HeroImage from '$lib/components/HeroImage.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data;
</script>

<HeroImage
	thumbnail={data.content.header_image.asset}
	thumbnailBlurhash={data.content.header_image.blurhash}
/>

<article class="prose mx-auto mt-8 px-6 dark:prose-invert lg:prose-lg lg:px-0">
	<PortableText value={data.content.main_text} />
</article>
