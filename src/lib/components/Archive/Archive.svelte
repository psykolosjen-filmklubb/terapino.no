<script lang="ts">
	import ArchiveLine from './ArchiveLine.svelte';
	import type { ArchiveState } from './ArchiveState.svelte';
	import Semester from './Semester.svelte';

	let { archive }: { archive: ArchiveState } = $props();
</script>

<article
	bind:clientWidth={archive.containerWidth}
	bind:clientHeight={archive.containerHeight}
	class="relative grid @container"
>
	<ArchiveLine {archive} />

	{#each archive.semesters as semester, index}
		<Semester {semester} {index} />
	{/each}
</article>
