<script lang="ts">
	import type { Archive } from '$lib/types/archive';
	import { flip } from 'svelte/animate';
	import Semester from './Semester.svelte';
	import { archiveStore } from './archiveStore';

	export let archive: Archive;

	$: $archiveStore.semesters = archive.reduce(
		(acc, semester) => ({
			...acc,
			[semester.id]: { open: true }
		}),
		{}
	);

	let windowWidth = 0;
	$: $archiveStore.windowWidth = windowWidth;
	$: $archiveStore.isMobile = windowWidth < 1024;
	$: $archiveStore.strokeWidth = $archiveStore.isMobile ? 2 : 4;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svg
	class="absolute"
	overflow="visible"
	style:left={$archiveStore.isMobile ? $archiveStore.circleWidth : windowWidth / 2}
>
	<line x="0" y1="0" y2="1000" stroke="black" stroke-width={$archiveStore.strokeWidth} />
</svg>

{#each archive as semester, i (semester.id)}
	<div style:margin-bottom={`${$archiveStore.semesters[semester.id].titlesHeight}px`} animate:flip>
		<Semester {semester} directionParam={i % 2 === 0 ? 'left' : 'right'} />
	</div>
{/each}
