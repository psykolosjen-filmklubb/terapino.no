<script lang="ts">
	import type { Semester } from '$lib/types/archive';
	import { draw, fade } from 'svelte/transition';

	export let semester: Semester;
	export let directionParam: 'left' | 'right';

	let button: HTMLButtonElement;

	let open = true;

	let width = 0;
	let height = 0;
	let windowWidth = 0;

	$: isMobile = windowWidth <= 1024;

	$: strokeWidth = isMobile ? 2 : 4;

	$: direction = isMobile ? 'right' : directionParam;

	$: button, setSize();

	function setSize() {
		const rect = button?.getBoundingClientRect();
		if (rect) {
			width = rect.width;
			height = rect.height;
		}
	}

	let textLength = 0;
	$: {
		semester.movies.forEach((movie) => {
			const length = movie.title.length + movie.year.toString().length + movie.director.length;
			if (length > textLength) {
				textLength = length;
			}
		});
	}
</script>

<svelte:window bind:innerWidth={windowWidth} on:resize={() => setSize()} />

<div class="relative">
	<button
		class="relative z-10 size-8 rounded-full border-2 border-primary lg:size-12 lg:border-4"
		style:background-color={semester.color}
		on:click={() => (open = !open)}
		bind:this={button}
	/>
	{#if open && button}
		<svg
			class="pointer-events-none absolute z-0"
			overflow="visible"
			style:left={direction === 'right' ? width - strokeWidth : strokeWidth}
			style:top={height / 2 - strokeWidth / 2}
		>
			<line
				transition:draw
				x1={0}
				x2={textLength * 10}
				stroke="black"
				stroke-width={strokeWidth}
				style:transform={direction === 'right' ? '' : 'rotate(180deg)'}
				class="z-0"
			/>
		</svg>
		<div
			transition:fade
			class="absolute"
			style:left={direction === 'right' ? `${width * 1.2}px` : ''}
			style:right={direction === 'left' ? `${width * 1.2}px` : ''}
			style:top={`${(5 * height) / 8}px`}
		>
			{#each semester.movies as movie}
				<span class="text-nowrap">{movie.title} ({movie.year}) - {movie.director}</span>
			{/each}
		</div>
	{/if}
</div>
