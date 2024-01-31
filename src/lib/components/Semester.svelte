<script lang="ts">
	import type { Semester } from '$lib/types/archive';
	import { draw, fade } from 'svelte/transition';

	export let semester: Semester;
	export let directionParam: 'left' | 'right';

	let button: HTMLButtonElement;

	let open = true;

	let circleWidth = 0;
	let circleHeight = 0;
	let windowWidth = 0;
	let lengthOfFirstMovie = 0;
	let lengthOfSemesterTitle = 0;

	$: isMobile = windowWidth < 1024;

	$: strokeWidth = isMobile ? 2 : 4;

	$: direction = isMobile ? 'right' : directionParam;

	$: button, setSize();

	$: pathX2 = isMobile ? windowWidth * 0.5 : lengthOfFirstMovie + circleWidth / 3;
	$: pathX3 = pathX2 + circleWidth / 3;
	$: pathX4 = isMobile ? windowWidth * 0.8 : pathX3 + lengthOfSemesterTitle + 8;
	$: pathY2 = circleHeight / 3;

	$: pathString = `M 0 0 L ${pathX2} 0 L ${pathX3} ${pathY2} L ${pathX4} ${pathY2}`;

	function setSize() {
		const rect = button?.getBoundingClientRect();
		if (rect) {
			circleWidth = rect.width;
			circleHeight = rect.height;
		}
	}
</script>

<svelte:window bind:innerWidth={windowWidth} on:resize={() => setSize()} />

<p
	class="invisible absolute text-sm font-light lg:text-base lg:font-thin"
	bind:clientWidth={lengthOfFirstMovie}
>
	{semester.movies[0].title} ({semester.movies[0].year}) - {semester.movies[0].director}
</p>

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
			style:left={direction === 'right' ? circleWidth - strokeWidth : strokeWidth}
			style:top={circleHeight / 2 - strokeWidth / 2}
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
		<h2
			in:fade={{ delay: 400 }}
			out:fade
			class="absolute text-nowrap text-lg font-semibold tracking-tight lg:text-xl"
			style:top={isMobile ? '0px' : `${pathY2 - strokeWidth}px`}
			style:left={direction === 'right'
				? (pathX3 + circleWidth + 4).toString() + 'px'
				: (-pathX3 - lengthOfSemesterTitle - 4).toString() + 'px'}
			bind:clientWidth={lengthOfSemesterTitle}
		>
			{semester.season.toUpperCase()}
			{semester.year}
		</h2>
	{/if}
	<div
		class="absolute w-dvw"
		style:max-width={isMobile ? pathX4.toString() + 'px' : ''}
		style:left={direction === 'right' ? `${circleWidth * 1.2}px` : 'auto'}
		style:right={direction === 'left' ? `${circleWidth * 1.2}px` : 'auto'}
		style:top={isMobile ? `${circleHeight}px` : `${(2 * circleHeight) / 3}px`}
		style:text-align={direction === 'right' ? 'left' : 'right'}
	>
		{#each semester.movies as movie, i}
			{#if open && button}
				<p
					in:fade={{ delay: 200 + 200 * (i + 1) }}
					out:fade={{
						delay: 100 * (semester.movies.length - i)
					}}
					class="mb-2 text-sm font-light lg:text-base lg:font-thin"
				>
					{movie.title} ({movie.year}) - {movie.director}
				</p>
			{/if}
		{/each}
	</div>
</div>
