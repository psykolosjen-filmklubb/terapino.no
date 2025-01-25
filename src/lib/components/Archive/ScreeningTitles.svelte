<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Screening, SemesterState } from './SemesterState.svelte';

	type ScreeningTitlesProps = {
		semester: SemesterState;
		direction: 'left' | 'right';
	};

	let { semester, direction }: ScreeningTitlesProps = $props();

	let lengthOfParentDiv = $state(0);

	let firstTitleMaxWidth = $derived(
		semester.archive.isNarrow
			? semester.archive.containerWidth - semester.archive.circleSize * 2 - semester.lengthOfName
			: semester.archive.containerWidth * 0.35
	);

	let titleMaxWidth = $derived(
		semester.archive.isNarrow
			? semester.archive.containerWidth - semester.archive.circleSize * 2
			: semester.archive.containerWidth * 0.5
	);

	function getLength(element: HTMLAnchorElement, _lengthOfParentDiv: number) {
		function calculate() {
			let width = 0;
			for (let i = 0; i < element.children.length; i++) {
				const newWidth = width + element.children[i].getBoundingClientRect().width;

				// floor() and ceil() to get around edge case where newWidth would be bigger by
				// a margin of ~0.0001 px.
				if (Math.floor(newWidth) > Math.ceil(element.getBoundingClientRect().width)) {
					break;
				}

				width = newWidth;
			}
			semester.lengthOfFirstTitle = width;
		}

		calculate();

		return {
			update() {
				calculate();
			}
		};
	}

	function getScreeningTitlesString(screening: Screening) {
		if (!screening.movies) return 'null';
		const titles = screening.movies.map((movie) => `${movie.title} (${movie.year})`).join(' / ');
		const directors = screening.movies.map((movie) => movie.directors).join(' / ');

		return `${titles} - ${directors}`;
	}
</script>

<div
	class="absolute grid gap-2"
	style:left={direction === 'right' ? `${semester.archive.circleSize * 1.2}px` : 'auto'}
	style:right={direction === 'left' ? `${semester.archive.circleSize * 1.2}px` : 'auto'}
	style:top={`${(2 * semester.archive.circleSize) / 3}px`}
	style:text-align={direction === 'right' ? 'left' : 'right'}
	style:place-items={direction === 'right' ? 'start' : 'end'}
	bind:clientHeight={semester.titlesHeight}
>
	{#each semester.screenings as screening, index}
		{#if semester.open && index === 0}
			<a
				href="/arkiv/{screening.slug.current}"
				class="group w-max"
				style:max-width={firstTitleMaxWidth + 'px'}
				use:getLength={lengthOfParentDiv}
				bind:clientWidth={lengthOfParentDiv}
				in:fade={{ delay: 100, duration: 200 }}
				out:fade={{ duration: 200 }}
			>
				{#each getScreeningTitlesString(screening).split(' ') as word}
					<span
						class="inline-block text-sm font-light group-hover:underline @5xl:text-base @5xl:font-thin"
					>
						{word}&nbsp;
					</span>
				{/each}
			</a>
		{:else if semester.open}
			<a
				href="/arkiv/{screening.slug.current}"
				class="w-max text-sm font-light hover:underline @5xl:text-base @5xl:font-thin"
				style:max-width={titleMaxWidth + 'px'}
				in:fade={{ delay: 100 + 40 * index, duration: 200 }}
				out:fade={{ duration: 200 }}
			>
				{getScreeningTitlesString(screening)}
			</a>
		{/if}
	{/each}
</div>
