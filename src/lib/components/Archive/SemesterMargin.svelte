<script lang="ts">
	import {
		archiveOptions,
		semesterMarginsBottom,
		semesterMarginsTop,
		semesterOptions
	} from './archiveStore';
	import type { Archive } from '$lib/types/archive';
	import { derived, get } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let archive: Archive;
	export let index: number;

	$: closedMargin = $archiveOptions.circleHeight / 3;
	$: minOpenMargin = $archiveOptions.circleHeight / 2;

	$: ({ titlesHeight, open } = $semesterOptions[archive[index].id]);

	$: mobileMarginBottom = Math.max(titlesHeight, closedMargin);
	$: desktopMarginBottom = Math.max(
		(titlesHeight - $archiveOptions.circleHeight) / 2,
		open ? minOpenMargin : closedMargin
	);
	$: $semesterMarginsBottom[archive[index].id] = $archiveOptions.isMobile
		? mobileMarginBottom
		: desktopMarginBottom;

	$: {
		if (index < 2 || $archiveOptions.isMobile || !open) {
			$semesterMarginsTop[archive[index].id] = 0;
			break $;
		}

		const lastElementBottomMargin = $semesterMarginsBottom[archive[index - 1].id];
		const secondLastElementBottomMargin = $semesterMarginsBottom[archive[index - 2].id];
		// If I subscribe the top-margin store it causes cyclic dependency,
		// therefore I read it with get(), to get value without subscribing.
		const lastElementTopMargin = get(semesterMarginsTop)[archive[index - 1].id];

		const { titlesHeight: secondLastTitlesHeight } = $semesterOptions[archive[index - 2].id];

		const spaceToSecondLast =
			secondLastElementBottomMargin +
			lastElementTopMargin +
			$archiveOptions.circleHeight +
			lastElementBottomMargin;

		if (spaceToSecondLast < secondLastTitlesHeight) {
			$semesterMarginsTop[archive[index].id] = secondLastTitlesHeight - spaceToSecondLast;
		} else {
			$semesterMarginsTop[archive[index].id] = 0;
		}
	}

	const derivedBottomMargin = derived(
		semesterMarginsBottom,
		(semesterMarginsBotto) => semesterMarginsBotto[archive[index].id]
	);
	const derivedTopMargin = derived(
		semesterMarginsTop,
		(semesterMarginsTo) => semesterMarginsTo[archive[index].id]
	);

	const tweenedBottomMargin = tweened($derivedBottomMargin, { duration: 750, easing: cubicOut });
	const tweenedTopMargin = tweened($derivedTopMargin, { duration: 750, easing: cubicOut });

	$: tweenedBottomMargin.set($derivedBottomMargin);
	$: tweenedTopMargin.set($derivedTopMargin);
</script>

<div style:margin-bottom={`${$tweenedBottomMargin}px`} style:margin-top={`${$tweenedTopMargin}px`}>
	<slot />
</div>
