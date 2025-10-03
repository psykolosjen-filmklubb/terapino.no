<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Button } from '../ui/button';
	import { page } from '$app/stores';
	import { focus } from 'focus-svelte';
	import { routes } from '$lib/routes';
	import ThemeToggle from '../ThemeToggle.svelte';
	import { Menu, X } from '@lucide/svelte';

	let isOpen = $state(false);

	function toggle() {
		return (isOpen = !isOpen);
	}

	function close() {
		return (isOpen = false);
	}

	const filteredRoutes = Object.values(routes).filter((route) => {
		if (route.route === 'bli-med') {
			return $page.data.settings.recruiting.recruiting_active;
		}
		return true;
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (isOpen && e.key === 'Escape') {
			close();
		}
	}}
/>

<div class="lg:hidden">
	<Button variant="ghost" size="icon" onclick={toggle}><Menu /></Button>
	{#if isOpen}
		<div
			transition:fly={{ opacity: 0, x: '100%' }}
			class="fixed inset-y-0 right-0 z-30 flex w-8/12 flex-col items-end bg-background px-6 py-5"
			use:focus={{ enabled: true, preventScroll: true }}
		>
			<button class="text-5xl" onclick={close}>
				<X />
			</button>
			<nav class="mt-8 flex flex-col items-end gap-2">
				{#each filteredRoutes as route}
					<Button
						variant="link"
						href="/{route.route}"
						onclick={close}
						class="p-0 text-xl {$page.url.pathname.startsWith('/' + route.route)
							? 'font-medium underline'
							: 'font-light'}"
					>
						{route.title}
					</Button>
				{/each}
			</nav>
			<span class="mt-8">
				<ThemeToggle />
			</span>
		</div>
	{/if}

	{#if isOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fixed inset-0 z-20 bg-black opacity-50" onclick={close}></div>
	{/if}
</div>

<div class="hidden gap-4 lg:flex">
	<nav class="flex gap-8">
		{#each filteredRoutes as route}
			<Button
				variant="link"
				href="/{route.route}"
				onclick={close}
				class="p-0 text-xl {$page.url.pathname.startsWith('/' + route.route)
					? 'font-medium underline'
					: 'font-light'} text-primary"
			>
				{route.title}
			</Button>
		{/each}
	</nav>
	<ThemeToggle />
</div>
