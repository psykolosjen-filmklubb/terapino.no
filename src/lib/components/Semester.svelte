<script lang="ts">
	import type { Semester } from '$lib/types/archive';
	import { draw, fade } from 'svelte/transition';

	export let semester: Semester;
	export let direction: 'left' | 'right';

	let button: HTMLButtonElement;

	let open = true;

	const STROKE_WIDTH = 4;

	$: width = button?.getBoundingClientRect().width;
	$: height = button?.getBoundingClientRect().height;

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

<div class="relative">
	<button
		class="relative z-10 size-12 rounded-full border-4 border-primary"
		style:background-color={semester.color}
		on:click={() => (open = !open)}
		bind:this={button}
	/>
	{#if open && button}
		<svg
			class="pointer-events-none absolute z-0"
			overflow="visible"
			style:left={direction === 'right' ? width - STROKE_WIDTH : STROKE_WIDTH}
			style:top={height / 2 - STROKE_WIDTH / 2}
		>
			<line
				transition:draw
				x1={0}
				x2={textLength * 10}
				stroke="black"
				stroke-width={STROKE_WIDTH}
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
