<script lang="ts">
	import WelcomeSection from "./WelcomeSection.svelte";
	import NextScreeningSection from "../lib/components/NextScreeningSection.svelte";
	import LatestReviewsSection from "$lib/components/LatestReviewsSection.svelte";

	let { data } = $props();
</script>

<WelcomeSection recruitingActive={data.settings.recruiting.recruiting_active} />

<NextScreeningSection nextScreening={data.nextScreening} />

{#if data.reviews}
	<LatestReviewsSection reviews={data.reviews} />
{/if}
