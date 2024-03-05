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

	$: ({ titlesHeight, open } = $semesterOptions[archive[index].name]);

	$: mobileMarginBottom = Math.max(titlesHeight, closedMargin);
	$: desktopMarginBottom = Math.max(
		(titlesHeight - $archiveOptions.circleHeight) / 2,
		open ? minOpenMargin : closedMargin
	);
	$: $semesterMarginsBottom[archive[index].name] = $archiveOptions.isMobile
		? mobileMarginBottom
		: desktopMarginBottom;

	$: {
		if (index < 2 || $archiveOptions.isMobile || !open) {
			$semesterMarginsTop[archive[index].name] = 0;
			break $;
		}

		const lastElementBottomMargin = $semesterMarginsBottom[archive[index - 1].name];
		const secondLastElementBottomMargin = $semesterMarginsBottom[archive[index - 2].name];
		// If I subscribe the top-margin store it causes cyclic dependency,
		// therefore I read it with get(), to get value without subscribing.
		const lastElementTopMargin = get(semesterMarginsTop)[archive[index - 1].name];

		const { titlesHeight: secondLastTitlesHeight } = $semesterOptions[archive[index - 2].name];

		const spaceToSecondLast =
			secondLastElementBottomMargin +
			lastElementTopMargin +
			$archiveOptions.circleHeight +
			lastElementBottomMargin;

		if (spaceToSecondLast < secondLastTitlesHeight) {
			$semesterMarginsTop[archive[index].name] = secondLastTitlesHeight - spaceToSecondLast;
		} else {
			$semesterMarginsTop[archive[index].name] = 0;
		}
	}

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
