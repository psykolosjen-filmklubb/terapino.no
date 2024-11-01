<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="flex w-full flex-col items-center justify-center gap-6 px-4 py-6 lg:max-w-screen-lg">
	{@render children?.()}
</div>
