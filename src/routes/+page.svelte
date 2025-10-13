<script lang="ts">
	import ApplyNowSection from "./ApplyNowSection.svelte";
	import NextScreeningSection from "../lib/components/NextScreeningSection.svelte";
	import LatestReviewsSection from "$lib/components/LatestReviewsSection.svelte";

	let { data } = $props();
</script>

{#if data.settings.recruiting.recruiting_active}
	<ApplyNowSection />
{/if}

<NextScreeningSection nextScreening={data.nextScreening} />

{#if data.reviews}
	<LatestReviewsSection reviews={data.reviews} />
{/if}
