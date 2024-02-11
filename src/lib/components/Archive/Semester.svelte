<script lang="ts">
	import type { Semester } from '$lib/types/archive';
	import { draw, fade } from 'svelte/transition';
	import { archiveOptions, semesterOptions } from './archiveStore';

	export let semester: Semester;
	export let directionParam: 'left' | 'right';

	let button: HTMLButtonElement;

	let lengthOfFirstMovie = 0;
	let lengthOfParentDiv = 0;
	let lengthOfSemesterTitle = 0;

	let titlesHeight = 0;
	let isClosing = false;
	$: $semesterOptions[semester.id].titlesHeight = isClosing ? 0 : titlesHeight;

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
					console.log(newWidth, 'is longer than', element.getBoundingClientRect().width);
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
	/>
	{#if $semesterOptions[semester.id].open && button}
		<svg
			class="pointer-events-none absolute z-0"
			overflow="visible"
			style:left={direction === 'right'
				? $archiveOptions.circleWidth - $archiveOptions.strokeWidth
				: $archiveOptions.strokeWidth}
			style:top={$archiveOptions.circleHeight / 2 - $archiveOptions.strokeWidth / 2}
		>
			<path
				transition:draw
				d={pathString}
				stroke="black"
				stroke-width={$archiveOptions.strokeWidth}
				style:transform={direction === 'right' ? '' : 'scale(-1, 1)'}
				class="z-0"
				fill="none"
			/>
		</svg>
		<h2
			in:fade={{ delay: 400 }}
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
			{#if $semesterOptions[semester.id].open && button && i === 0}
				<div
					in:fade={{ delay: 200 + 200 * (i + 1) }}
					out:fade={{
						delay: 100 * (semester.movies.length - i)
					}}
					on:outrostart={() => (isClosing = true)}
					on:outroend={() => (isClosing = false)}
					on:introstart={() => (isClosing = false)}
					class="w-max"
					style:max-width={$archiveOptions.isMobile ? pathX4.toString() + 'px' : '33dvw'}
					use:getLength={lengthOfParentDiv}
					bind:clientWidth={lengthOfParentDiv}
				>
					{#each `${movie.title} (${movie.year}) - ${movie.director}`.split(' ') as word}
						<p class="inline-block text-sm font-light lg:text-base lg:font-thin">{word}&nbsp;</p>
					{/each}
				</div>
			{:else if $semesterOptions[semester.id].open && button}
				<p
					in:fade={{ delay: 200 + 200 * (i + 1) }}
					out:fade={{
						delay: 100 * (semester.movies.length - i)
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
