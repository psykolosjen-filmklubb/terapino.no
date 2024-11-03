<script lang="ts">
	import ScreeningTitles from './ScreeningTitles.svelte';
	import type { SemesterState } from './SemesterState.svelte';
	import SemesterLine from './SemesterLine.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	type SemesterProps = {
		semester: SemesterState;
		index: number;
	};

	let { semester, index }: SemesterProps = $props();

	let direction: 'left' | 'right' = $derived.by(() => {
		if (semester.archive.isNarrow) return 'right';

		return index % 2 === 0 ? 'left' : 'right';
	});

	const tweenedMarginBotton = tweened(semester.marginBottom, { duration: 600, easing: cubicOut });
	const tweenedMarginTop = tweened(semester.marginTop, { duration: 600, easing: cubicOut });

	$effect(() => {
		tweenedMarginBotton.set(semester.marginBottom);
	});

	$effect(() => {
		tweenedMarginTop.set(semester.marginTop);
	});
</script>

<div
	class="relative w-max justify-self-start @5xl:justify-self-center"
	style:margin-bottom={$tweenedMarginBotton + 'px'}
	style:margin-top={$tweenedMarginTop + 'px'}
>
	<button
		class="z-10 rounded-full border-foreground"
		style:background-color={semester.color}
		style:border-width={`${semester.archive.strokeWidth}px`}
		style:width={`${semester.archive.circleSize}px`}
		style:height={`${semester.archive.circleSize}px`}
		onclick={() => semester.toggleOpen()}
		aria-label="Toggle semester open"
	></button>

	<SemesterLine {semester} {direction} />

	<ScreeningTitles {semester} {direction} />
</div>
