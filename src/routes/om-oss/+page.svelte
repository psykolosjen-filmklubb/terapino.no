<script>
	import HeroImage from '$lib/components/HeroImage.svelte';

	export let data;
</script>

<HeroImage
	thumbnail={data.content.header_image.asset}
	thumbnailBlurhash={data.content.header_image.blurhash}
/>
