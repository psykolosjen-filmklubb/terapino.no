<script lang="ts">
	import type { Movie } from '$lib/types/archive';
	import { fade } from 'svelte/transition';
	import { archiveOptions } from './archiveStore';

	export let screening: Movie;
	export let index: number;
	export let open: boolean;
	export let firstRenderDelay: number;
	export let maxWidth: number;
	export let semesterLength: number;

	export let firstRender = true;
	export let lengthOfFirstMovie = 0;

	let lengthOfParentDiv = 0;

	function getLength(element: HTMLAnchorElement, _lengthOfParentDiv: number) {
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

		calculate();

		return {
			update() {
				calculate();
			}
		};
	}
</script>

{#if open && index === 0}
	<a
		href="/arkiv/{screening.slug.current}"
		in:fade={{
			delay: firstRenderDelay + 400,
			duration: 250
		}}
		out:fade={{
			delay: 50 * (semesterLength - index),
			duration: 200
		}}
		on:introend={() => {
			if (index === semesterLength - 1) firstRender = false;
		}}
		class="group w-max"
		style:max-width={$archiveOptions.isMobile ? maxWidth.toString() + 'px' : '33dvw'}
		use:getLength={lengthOfParentDiv}
		bind:clientWidth={lengthOfParentDiv}
	>
		{#each `${screening.title} (${screening.year}) - ${screening.director}`.split(' ') as word}
			<span class="inline-block text-sm font-light group-hover:underline lg:text-base lg:font-thin"
				>{word}&nbsp;</span
			>
		{/each}
	</a>
{:else if open}
	<a
		href="/arkiv/{screening.slug.current}"
		in:fade={{
			delay: firstRenderDelay + 400 + 50 * index,
			duration: 250
		}}
		out:fade={{
			delay: 50 * (semesterLength - index),
			duration: 200
		}}
		on:introend={() => {
			if (index === semesterLength - 1) firstRender = false;
		}}
		class="w-max text-sm font-light hover:underline lg:text-base lg:font-thin"
		style:max-width={$archiveOptions.isMobile ? maxWidth.toString() + 'px' : '33dvw'}
	>
		{screening.title} ({screening.year}) - {screening.director}
	</a>
{/if}
