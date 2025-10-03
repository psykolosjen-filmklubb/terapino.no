<script lang="ts">
	import type { WithoutChildren } from 'bits-ui';
	import { getEmblaContext } from './context.js';
	import { cn } from '$lib/utils.js';
	import { Button, type Props } from '$lib/components/ui/button/index.js';
	import { ArrowLeft } from '@lucide/svelte';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'outline',
		size = 'icon',
		...restProps
	}: WithoutChildren<Props> = $props();

	const emblaCtx = getEmblaContext('<Carousel.Previous/>');
</script>

<Button
	{variant}
	{size}
	class={cn(
		'absolute size-8 touch-manipulation rounded-full border-0 bg-opacity-60',
		emblaCtx.orientation === 'horizontal'
			? 'left-1 top-1/2 -translate-y-1/2 lg:-left-2'
			: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
		emblaCtx.canScrollPrev ? 'visible' : 'pointer-events-none invisible',
		className
	)}
	disabled={!emblaCtx.canScrollPrev}
	onclick={emblaCtx.scrollPrev}
	onkeydown={emblaCtx.handleKeyDown}
	{...restProps}
	bind:ref
>
	<ArrowLeft class="size-4" />
	<span class="sr-only">Previous slide</span>
</Button>
