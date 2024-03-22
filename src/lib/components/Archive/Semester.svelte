<script lang="ts">
	import type { Semester } from '$lib/components/Archive/types';
	import { blur, draw, fade } from 'svelte/transition';
	import { archiveOptions, semesterOptions } from './archiveStore';
	import { onMount, tick } from 'svelte';
	import { derived } from 'svelte/store';
	import ScreeningText from './ScreeningText.svelte';

	export let semester: Semester;
	export let directionParam: 'left' | 'right';
	export let delay = 0;

	let firstRender: boolean;
	$: firstRenderDelay = firstRender ? delay + 500 : 0;

	let button: HTMLButtonElement;

	let lengthOfFirstMovie: number;
	let lengthOfSemesterTitle = 0;

	let isOpen = derived(semesterOptions, ($semesterOptions) => $semesterOptions[semester.name].open);

	let titlesHeight = 0;
	$: $semesterOptions[semester.name].titlesHeight = $isOpen ? titlesHeight : 0;

	$: direction = $archiveOptions.isMobile ? 'right' : directionParam;
	$: button, setSize();

	$: pathX2 = $archiveOptions.isMobile
		? $archiveOptions.windowWidth * 0.5
		: lengthOfFirstMovie + $archiveOptions.circleWidth / 3;
	$: pathX3 = pathX2 + $archiveOptions.circleWidth / 3;
	$: pathX4 = $archiveOptions.isMobile
		? $archiveOptions.windowWidth * 0.8
		: pathX3 + lengthOfSemesterTitle + 8;
	$: pathY2 = $archiveOptions.circleHeight / 3;
	$: pathString = `M 0 0 L ${pathX2} 0 L ${pathX3} ${pathY2} L ${pathX4} ${pathY2}`;

	onMount(async () => {
		await tick();
		$semesterOptions[semester.name].open = true;
	});

	function setSize() {
		const rect = button?.getBoundingClientRect();
		if (rect) {
			$archiveOptions.circleWidth = rect.width;
			$archiveOptions.circleHeight = rect.height;
		}
	}
</script>

<svelte:window on:resize={() => setSize()} />

<div class="relative">
	<button
		class="relative z-10 size-8 rounded-full border-2 border-primary lg:size-12 lg:border-4"
		style:background-color={semester.color}
		on:click={() => ($semesterOptions[semester.name].open = !$semesterOptions[semester.name].open)}
		bind:this={button}
		in:blur|global={{ delay, duration: 1000 }}
	/>
	{#if $isOpen && button}
		<svg
			class="pointer-events-none absolute z-0"
			overflow="visible"
			style:left={direction === 'right'
				? $archiveOptions.circleWidth - $archiveOptions.strokeWidth
				: $archiveOptions.strokeWidth}
			style:top={$archiveOptions.circleHeight / 2 - $archiveOptions.strokeWidth / 2}
			style:stroke={$archiveOptions.strokeColor}
		>
			<path
				in:draw={{ delay: firstRenderDelay }}
				out:draw
				d={pathString}
				stroke-width={$archiveOptions.strokeWidth}
				style:transform={direction === 'right' ? '' : 'scale(-1, 1)'}
				class="z-0"
				fill="none"
			/>
		</svg>
		<h2
			in:fade={{ delay: firstRenderDelay + 400 }}
			out:fade
			class="absolute text-nowrap text-lg font-semibold tracking-tight lg:text-xl"
			style:top={$archiveOptions.isMobile ? '0px' : `${pathY2 - $archiveOptions.strokeWidth}px`}
			style:left={direction === 'right'
				? (pathX3 + $archiveOptions.circleWidth + 4).toString() + 'px'
				: (-pathX3 - lengthOfSemesterTitle - 4).toString() + 'px'}
			bind:clientWidth={lengthOfSemesterTitle}
		>
			{semester.name.toUpperCase()}
		</h2>
	{/if}
	<div
		class="absolute grid gap-2"
		style:left={direction === 'right' ? `${$archiveOptions.circleWidth * 1.2}px` : 'auto'}
		style:right={direction === 'left' ? `${$archiveOptions.circleWidth * 1.2}px` : 'auto'}
		style:top={$archiveOptions.isMobile
			? `${$archiveOptions.circleHeight}px`
			: `${(2 * $archiveOptions.circleHeight) / 3}px`}
		style:text-align={direction === 'right' ? 'left' : 'right'}
		style:place-items={direction === 'right' ? 'start' : 'end'}
		bind:clientHeight={titlesHeight}
	>
		{#each semester.movies as movie, index}
			<ScreeningText
				screening={movie}
				{index}
				open={!!($isOpen && button)}
				{firstRenderDelay}
				maxWidth={pathX4}
				semesterLength={semester.movies.length}
				bind:firstRender
				bind:lengthOfFirstMovie
			/>
		{/each}
	</div>
</div>
