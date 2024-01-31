<script lang="ts">
	import type { Archive } from '$lib/types/archive';
	import Semester from './Semester.svelte';

	export let archive: Archive;

	let windowWidth = 0;
	let circleWidth: number;

	$: isMobile = windowWidth < 1024;

	$: strokeWidth = isMobile ? 2 : 4;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svg class="absolute" overflow="visible" style:left={isMobile ? circleWidth : windowWidth / 2}>
	<line x="0" y1="0" y2="100" stroke="black" stroke-width={strokeWidth} />
</svg>

{#each archive as semester, i}
	<Semester {semester} directionParam={i % 2 === 0 ? 'left' : 'right'} bind:circleWidth />
{/each}
