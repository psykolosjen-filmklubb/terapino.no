<script lang="ts">
	import type { Archive } from '$lib/types/archive';
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
				open: false,
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

	let archiveHeight = tweened(0, { duration: 1000, easing: cubicOut });
	let archiveWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svg
	class="absolute"
	overflow="visible"
	style:left={$archiveOptions.isMobile ? $archiveOptions.circleWidth : archiveWidth / 2}
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

<div class="grid w-full lg:place-content-center" bind:clientWidth={archiveWidth}>
	<div class="mb-24 grid pl-4 lg:mb-48 lg:p-0" bind:clientHeight={$archiveHeight}>
		{#each archive as semester, i (semester.id)}
			<SemesterMargin {archive} index={i}>
				<Semester {semester} directionParam={i % 2 === 0 ? 'left' : 'right'} delay={i * 150} />
			</SemesterMargin>
		{/each}
	</div>
</div>
