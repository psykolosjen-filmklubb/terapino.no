<script lang="ts">
	import type { Archive } from '$lib/types/archive';
	import { flip } from 'svelte/animate';
	import Semester from './Semester.svelte';
	import {
		archiveOptions,
		semesterOptions,
		type SemesterOptions,
		semesterMarginsTop,
		semesterMarginsBottom
	} from './archiveStore';
	import SemesterMargin from './SemesterMargin.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

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

	$: $semesterMarginsTop = archive.reduce(
		(acc, semester) => ({
			...acc,
			[semester.id]: 0
		}),
		{} as Record<string, number>
	);

	$: $semesterMarginsBottom = archive.reduce(
		(acc, semester) => ({
			...acc,
			[semester.id]: 0
		}),
		{} as Record<string, number>
	);

	let windowWidth = 0;
	$: $archiveOptions.windowWidth = windowWidth;
	$: $archiveOptions.isMobile = windowWidth < 1024;
	$: $archiveOptions.strokeWidth = $archiveOptions.isMobile ? 2 : 4;

	let archiveHeight = tweened(0, { duration: 500, easing: cubicOut });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svg
	class="absolute"
	overflow="visible"
	style:left={$archiveOptions.isMobile ? $archiveOptions.circleWidth : windowWidth / 2}
>
	<line
		x="0"
		y1="0"
		y2={$archiveHeight}
		stroke="black"
		stroke-width={$archiveOptions.strokeWidth}
	/>
	<line
		x="0"
		y1={$archiveHeight}
		y2={$archiveHeight + ($archiveOptions.isMobile ? 96 : 196)}
		stroke="black"
		stroke-width={$archiveOptions.strokeWidth}
		stroke-dasharray="20"
	/>
</svg>

<div class="mb-24 grid lg:mb-48" bind:clientHeight={$archiveHeight}>
	{#each archive as semester, i (semester.id)}
		{@const marginBottom = $semesterMarginsBottom[semester.id]}
		{@const marginTop = $semesterMarginsTop[semester.id]}
		<div animate:flip style:margin-bottom={`${marginBottom}px`} style:margin-top={`${marginTop}px`}>
			<SemesterMargin {archive} index={i}>
				<Semester {semester} directionParam={i % 2 === 0 ? 'left' : 'right'} />
			</SemesterMargin>
		</div>
	{/each}
</div>
