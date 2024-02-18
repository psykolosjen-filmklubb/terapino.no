<script lang="ts">
	import type { Semester } from '$lib/types/archive';
	import { blur, draw, fade } from 'svelte/transition';
	import { archiveOptions, semesterOptions } from './archiveStore';
	import { onMount, tick } from 'svelte';
	import { derived } from 'svelte/store';

	export let semester: Semester;
	export let directionParam: 'left' | 'right';
	export let delay = 0;

	let firstRender = true;
	$: firstRenderDelay = firstRender ? delay + 500 : 0;

	let button: HTMLButtonElement;

	let lengthOfFirstMovie = 0;
	let lengthOfParentDiv = 0;
	let lengthOfSemesterTitle = 0;

	let isOpen = derived(semesterOptions, ($semesterOptions) => $semesterOptions[semester.id].open);

	let titlesHeight = 0;
	$: $semesterOptions[semester.id].titlesHeight = $isOpen ? titlesHeight : 0;

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
		$semesterOptions[semester.id].open = true;
	});

	function setSize() {
		const rect = button?.getBoundingClientRect();
		if (rect) {
			$archiveOptions.circleWidth = rect.width;
			$archiveOptions.circleHeight = rect.height;
		}
	}

	function getLength(element: HTMLDivElement, _lengthOfParentDiv: number) {
		function calculate() {
			let width = 0;
			for (let i = 0; i < element.children.length - 1; i++) {
				const newWidth = width + element.children[i].getBoundingClientRect().width;

				// floor() and ceil() to get around edge case where newWidth would be bigger by
				// a margin of ~0.0001 px.
				if (Math.floor(newWidth) > Math.ceil(element.getBoundingClientRect().width)) {
					break;
				}

				width = newWidth;
			}
			lengthOfFirstMovie = width;
		}

		return {
			update() {
				calculate();
			}
		};
	}
</script>

<svelte:window on:resize={() => setSize()} />

<div class="relative">
	<button
		class="relative z-10 size-8 rounded-full border-2 border-primary lg:size-12 lg:border-4"
		style:background-color={semester.color}
		on:click={() => ($semesterOptions[semester.id].open = !$semesterOptions[semester.id].open)}
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
		>
			<path
				in:draw={{ delay: firstRenderDelay }}
				out:draw
				d={pathString}
				stroke="black"
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
			{semester.season.toUpperCase()}
			{semester.year}
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
		{#each semester.movies as movie, i}
			{#if $isOpen && button && i === 0}
				<div
					in:fade={{
						delay: firstRenderDelay + 400,
						duration: 250
					}}
					out:fade={{
						delay: 50 * (semester.movies.length - i),
						duration: 200
					}}
					on:introend={() => {
						if (i === semester.movies.length - 1) firstRender = false;
					}}
					class="w-max"
					style:max-width={$archiveOptions.isMobile ? pathX4.toString() + 'px' : '33dvw'}
					use:getLength={lengthOfParentDiv}
					bind:clientWidth={lengthOfParentDiv}
				>
					{#each `${movie.title} (${movie.year}) - ${movie.director}`.split(' ') as word}
						<p class="inline-block text-sm font-light lg:text-base lg:font-thin">{word}&nbsp;</p>
					{/each}
				</div>
			{:else if $isOpen && button}
				<p
					in:fade={{
						delay: firstRenderDelay + 400 + 50 * i,
						duration: 250
					}}
					out:fade={{
						delay: 50 * (semester.movies.length - i),
						duration: 200
					}}
					on:introend={() => {
						if (i === semester.movies.length - 1) firstRender = false;
					}}
					class="w-max text-sm font-light lg:text-base lg:font-thin"
					style:max-width={$archiveOptions.isMobile ? pathX4.toString() + 'px' : '33dvw'}
				>
					{movie.title} ({movie.year}) - {movie.director}
				</p>
			{/if}
		{/each}
	</div>
</div>
