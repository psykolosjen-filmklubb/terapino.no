<script lang="ts">
	import type { Semester } from '$lib/types/archive';
	import { draw, fade } from 'svelte/transition';
	import { archiveStore } from './archiveStore';

	export let semester: Semester;
	export let directionParam: 'left' | 'right';

	let button: HTMLButtonElement;

	let lengthOfFirstMovie = 0;
	let lengthOfSemesterTitle = 0;

	let titlesHeight = 0;
	$: $archiveStore.semesters[semester.id].titlesHeight = titlesHeight;

	$: direction = $archiveStore.isMobile ? 'right' : directionParam;
	$: button, setSize();

	$: pathX2 = $archiveStore.isMobile
		? $archiveStore.windowWidth * 0.5
		: lengthOfFirstMovie + $archiveStore.circleWidth / 3;
	$: pathX3 = pathX2 + $archiveStore.circleWidth / 3;
	$: pathX4 = $archiveStore.isMobile
		? $archiveStore.windowWidth * 0.8
		: pathX3 + lengthOfSemesterTitle + 8;
	$: pathY2 = $archiveStore.circleHeight / 3;
	$: pathString = `M 0 0 L ${pathX2} 0 L ${pathX3} ${pathY2} L ${pathX4} ${pathY2}`;

	function setSize() {
		const rect = button?.getBoundingClientRect();
		if (rect) {
			$archiveStore.circleWidth = rect.width;
			$archiveStore.circleHeight = rect.height;
		}
	}
</script>

<svelte:window on:resize={() => setSize()} />

<div class="relative">
	<button
		class="relative z-10 size-8 rounded-full border-2 border-primary lg:size-12 lg:border-4"
		style:background-color={semester.color}
		on:click={() =>
			($archiveStore.semesters[semester.id].open = !$archiveStore.semesters[semester.id].open)}
		bind:this={button}
	/>
	{#if $archiveStore.semesters[semester.id].open && button}
		<svg
			class="pointer-events-none absolute z-0"
			overflow="visible"
			style:left={direction === 'right'
				? $archiveStore.circleWidth - $archiveStore.strokeWidth
				: $archiveStore.strokeWidth}
			style:top={$archiveStore.circleHeight / 2 - $archiveStore.strokeWidth / 2}
		>
			<path
				transition:draw
				d={pathString}
				stroke="black"
				stroke-width={$archiveStore.strokeWidth}
				style:transform={direction === 'right' ? '' : 'scale(-1, 1)'}
				class="z-0"
				fill="none"
			/>
		</svg>
		<h2
			in:fade={{ delay: 400 }}
			out:fade
			class="absolute text-nowrap text-lg font-semibold tracking-tight lg:text-xl"
			style:top={$archiveStore.isMobile ? '0px' : `${pathY2 - $archiveStore.strokeWidth}px`}
			style:left={direction === 'right'
				? (pathX3 + $archiveStore.circleWidth + 4).toString() + 'px'
				: (-pathX3 - lengthOfSemesterTitle - 4).toString() + 'px'}
			bind:clientWidth={lengthOfSemesterTitle}
		>
			{semester.season.toUpperCase()}
			{semester.year}
		</h2>
	{/if}
	<div
		class="absolute grid"
		style:left={direction === 'right' ? `${$archiveStore.circleWidth * 1.2}px` : 'auto'}
		style:right={direction === 'left' ? `${$archiveStore.circleWidth * 1.2}px` : 'auto'}
		style:top={$archiveStore.isMobile
			? `${$archiveStore.circleHeight}px`
			: `${(2 * $archiveStore.circleHeight) / 3}px`}
		style:text-align={direction === 'right' ? 'left' : 'right'}
		style:place-items={direction === 'right' ? 'start' : 'end'}
		bind:clientHeight={titlesHeight}
	>
		{#each semester.movies as movie, i}
			{#if $archiveStore.semesters[semester.id].open && button && i === 0}
				<p
					in:fade={{ delay: 200 + 200 * (i + 1) }}
					out:fade={{
						delay: 100 * (semester.movies.length - i)
					}}
					class="mb-2 w-max text-sm font-light lg:text-base lg:font-thin"
					style:max-width={$archiveStore.isMobile ? pathX4.toString() + 'px' : '33dvw'}
					bind:clientWidth={lengthOfFirstMovie}
				>
					{movie.title} ({movie.year}) - {movie.director}
				</p>
			{:else if $archiveStore.semesters[semester.id].open && button}
				<p
					in:fade={{ delay: 200 + 200 * (i + 1) }}
					out:fade={{
						delay: 100 * (semester.movies.length - i)
					}}
					class="mb-2 w-max text-sm font-light lg:text-base lg:font-thin"
					style:max-width={$archiveStore.isMobile ? pathX4.toString() + 'px' : '33dvw'}
				>
					{movie.title} ({movie.year}) - {movie.director}
				</p>
			{/if}
		{/each}
	</div>
</div>
