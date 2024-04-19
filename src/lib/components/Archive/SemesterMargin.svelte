<script lang="ts">
	import {
		archiveOptions,
		semesterMarginsBottom,
		semesterMarginsTop,
		semesterOptions
	} from './archiveStore';
	import type { Archive } from '$lib/components/Archive/types';
	import { derived, type Readable } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let archive: Archive;
	export let index: number;

	$: closedMargin = $archiveOptions.circleHeight / 3;
	$: minOpenMargin = $archiveOptions.circleHeight / 2;

	$: ({ titlesHeight, open } = $semesterOptions[archive[index].name]);

	$: mobileMarginBottom = Math.max(titlesHeight, closedMargin);
	$: desktopMarginBottom = Math.max(
		(titlesHeight - $archiveOptions.circleHeight) / 2,
		open ? minOpenMargin : closedMargin
	);
	$: $semesterMarginsBottom[archive[index].name] = $archiveOptions.isMobile
		? mobileMarginBottom
		: desktopMarginBottom;

	let derivedLastSemesterMarginBottom: Readable<number> | undefined;
	let derivedSecondLastSemesterMarginBottom: Readable<number> | undefined;
	let derivedSecondLastTitlesHeight: Readable<number> | undefined;

	if (index >= 2) {
		derivedLastSemesterMarginBottom = derived(
			semesterMarginsBottom,
			($semesterMarginsBottom) => $semesterMarginsBottom[archive[index - 1].name]
		);
		derivedSecondLastSemesterMarginBottom = derived(
			semesterMarginsBottom,
			($semesterMarginsBottom) => $semesterMarginsBottom[archive[index - 2].name]
		);
		derivedSecondLastTitlesHeight = derived(
			semesterOptions,
			($semesterOptions) => $semesterOptions[archive[index - 2].name].titlesHeight
		);
	}

	function setTopMargin(
		index: number,
		isMobile: boolean,
		open: boolean,
		lastMarginBottom: number | undefined,
		secondLastMarginBottom: number | undefined,
		secondLastTitlesHeight: number | undefined
	) {
		if (index < 2 || isMobile || !open) {
			$semesterMarginsTop[archive[index].name] = 0;
			return;
		}

		if (!lastMarginBottom || !secondLastMarginBottom || !secondLastTitlesHeight) {
			return;
		}

		const lastElementTopMargin = $semesterMarginsTop[archive[index - 1].name];

		const spaceToSecondLast =
			secondLastMarginBottom +
			lastElementTopMargin +
			$archiveOptions.circleHeight +
			lastMarginBottom;

		if (spaceToSecondLast < secondLastTitlesHeight) {
			$semesterMarginsTop[archive[index].name] = secondLastTitlesHeight - spaceToSecondLast;
		} else {
			$semesterMarginsTop[archive[index].name] = 0;
		}
	}

	$: setTopMargin(
		index,
		$archiveOptions.isMobile,
		open,
		$derivedLastSemesterMarginBottom,
		$derivedSecondLastSemesterMarginBottom,
		$derivedSecondLastTitlesHeight
	);

	const derivedBottomMargin = derived(
		semesterMarginsBottom,
		(semesterMarginsBotto) => semesterMarginsBotto[archive[index].name]
	);
	const derivedTopMargin = derived(
		semesterMarginsTop,
		(semesterMarginsTo) => semesterMarginsTo[archive[index].name]
	);

	const tweenedBottomMargin = tweened($derivedBottomMargin, { duration: 750, easing: cubicOut });
	const tweenedTopMargin = tweened($derivedTopMargin, { duration: 750, easing: cubicOut });

	$: tweenedBottomMargin.set($derivedBottomMargin);
	$: tweenedTopMargin.set($derivedTopMargin);
</script>

<div style:margin-bottom={`${$tweenedBottomMargin}px`} style:margin-top={`${$tweenedTopMargin}px`}>
	<slot />
</div>
