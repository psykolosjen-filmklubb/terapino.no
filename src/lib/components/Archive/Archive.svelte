<script lang="ts">
	import type { Archive } from '$lib/types/archive';
	import { flip } from 'svelte/animate';
	import Semester from './Semester.svelte';
	import { archiveOptions, semesterOptions, type SemesterOptions } from './archiveStore';

	export let archive: Archive;

	$: $semesterOptions = archive.reduce(
		(acc, semester) => ({
			...acc,
			[semester.id]: {
				open: true,
				titlesHeight: 0
			}
		}),
		{} as Record<string, SemesterOptions>
	);

	let windowWidth = 0;
	$: $archiveOptions.windowWidth = windowWidth;
	$: $archiveOptions.isMobile = windowWidth < 1024;
	$: $archiveOptions.strokeWidth = $archiveOptions.isMobile ? 2 : 4;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svg
	class="absolute"
	overflow="visible"
	style:left={$archiveOptions.isMobile ? $archiveOptions.circleWidth : windowWidth / 2}
>
	<line x="0" y1="0" y2="1000" stroke="black" stroke-width={$archiveOptions.strokeWidth} />
</svg>

{#each archive as semester, i (semester.id)}
	<div style:margin-bottom={`${$semesterOptions[semester.id].titlesHeight}px`} animate:flip>
		<Semester {semester} directionParam={i % 2 === 0 ? 'left' : 'right'} />
	</div>
{/each}
