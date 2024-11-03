<script lang="ts">
	import type { ArchiveState } from './ArchiveState.svelte';

	let { archive }: { archive: ArchiveState } = $props();

	let earliestSemester = $derived(
		[...archive.semesters].sort((a, b) => {
			return a.startDate < b.startDate ? -1 : 1;
		})[0]
	);

	/**
	 * Normally the line would be drawn from the top to the bottom of the container,
	 * minus the circle size. However, when the last semester is open, the container
	 * stretches beyond the circle size, so we need to subtract the titles height as
	 * well, to make the line end at the last circle, and not the bottom of the container.
	 */
	let lineY2 = $derived(
		earliestSemester.open
			? archive.containerHeight - earliestSemester.titlesHeight - archive.circleSize / 2
			: archive.containerHeight - archive.circleSize
	);
</script>

<svg
	class="absolute stroke-foreground"
	overflow="visible"
	style:left={archive.isNarrow ? archive.circleSize / 2 : archive.containerWidth / 2}
>
	<line x="0" y1={archive.circleSize / 2} y2={lineY2} stroke-width={archive.strokeWidth} />
</svg>
