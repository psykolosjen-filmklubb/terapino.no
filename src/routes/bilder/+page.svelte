<script lang="ts">
	import MediaGallery from '$lib/components/MediaGallery.svelte';

	let { data } = $props();
</script>

<h1 class="m-4 scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors">
	Quentin Terapino's bildegalleri
</h1>

<p class="px-4 text-center lg:px-0 lg:text-left">
	Her vil vi samle litt bilder og videoer fra ulike arrangementer og turer vi drar på, og også de
	samlede bildene fra visningene våre.
</p>

<div class="m-4">
	<MediaGallery events={data.mediaEvents} />
</div>
