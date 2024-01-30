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

	$: lengthOfFirstMovie =
		semester.movies[0].title.length +
		semester.movies[0].year.toString().length +
		semester.movies[0].director.length;

	$: pathX2 = isMobile ? windowWidth * 0.5 : lengthOfFirstMovie * 8;
	$: pathX3 = pathX2 + width / 3;
	$: pathX4 = isMobile ? windowWidth * 0.8 : pathX3 + 110;
	$: pathY2 = height / 3;

	$: pathString = `M 0 0 L ${pathX2} 0 L ${pathX3} ${pathY2} L ${pathX4} ${pathY2}`;

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
			<path
				transition:draw
				d={pathString}
				stroke="black"
				stroke-width={strokeWidth}
				style:transform={direction === 'right' ? '' : 'scale(-1, 1)'}
				class="z-0"
				fill="none"
			/>
		</svg>
		<div
			class="absolute w-dvw"
			style:max-width={isMobile ? pathX4.toString() + 'px' : ''}
			style:left={direction === 'right' ? `${width * 1.2}px` : ''}
			style:right={direction === 'left' ? `${width * 1.2}px` : ''}
			style:top={isMobile ? `${(7 * height) / 8}px` : `${(2 * height) / 3}px`}
		>
			{#each semester.movies as movie, i}
				<p
					in:fade|global={{ delay: 200 + 200 * (i + 1) }}
					out:fade|global={{ delay: 100 * (semester.movies.length - i) }}
					class="text-xs"
				>
					{movie.title} ({movie.year}) - {movie.director}
				</p>
			{/each}
		</div>
		<h2
			in:fade={{ delay: 400 }}
			out:fade
			class="absolute text-nowrap text-lg font-semibold tracking-tight lg:text-xl"
			style:top={isMobile ? '0px' : `${0.55}rem`}
			style:left={direction === 'right'
				? (pathX3 + width + 4).toString() + 'px'
				: (-pathX3 - width * 2).toString() + 'px'}
		>
			{semester.season.toUpperCase()}
			{semester.year}
		</h2>
	{/if}
</div>
