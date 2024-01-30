<script lang="ts">
	import type { Semester } from '$lib/types/archive';
	import { draw } from 'svelte/transition';

	export let semester: Semester;
	export let direction: 'left' | 'right';

	let button: HTMLButtonElement;

	let open = true;

	const STROKE_WIDTH = 4;

	$: width = button?.getBoundingClientRect().width;
	$: height = button?.getBoundingClientRect().height;
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
				x2={100}
				stroke="black"
				stroke-width={STROKE_WIDTH}
				style:transform={direction === 'right' ? '' : 'rotate(180deg)'}
				class="z-0"
			/>
		</svg>
	{/if}
</div>
