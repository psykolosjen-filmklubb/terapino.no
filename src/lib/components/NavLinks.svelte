<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { Button } from './ui/button';
	import { page } from '$app/stores';
	import { focus } from 'focus-svelte';
	import { routes } from '$lib/routes';
	import ThemeToggle from './ThemeToggle.svelte';

	let isOpen = false;

	function toggle() {
		return (isOpen = !isOpen);
	}

	function close() {
		return (isOpen = false);
	}

	$: filteredRoutes = Object.values(routes).filter((route) => {
		if (route.route === 'bli-med') {
			return $page.data.settings.recruiting.recruiting_active;
		}
		return true;
	});
</script>

<svelte:window
	on:keydown={(e) => {
		if (isOpen && e.key === 'Escape') {
			close();
		}
	}}
/>

<div class="lg:hidden">
	<Button variant="ghost" size="icon" on:click={toggle}><Menu /></Button>
	{#if isOpen}
		<div
			transition:fly={{ opacity: 0, x: '100%' }}
			class="fixed inset-y-0 right-0 z-30 flex w-8/12 flex-col items-end bg-background px-6 py-5"
			use:focus={{ enabled: true, preventScroll: true }}
		>
			<button class="text-5xl" on:click={close}>
				<X />
			</button>
			<nav class="mt-8 flex flex-col items-end gap-2">
				{#each filteredRoutes as route}
					<Button
						variant="link"
						href="/{route.route}"
						on:click={close}
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="fixed inset-0 z-20 bg-black opacity-50" on:click={close} />
	{/if}
</div>

<div class="hidden gap-4 lg:flex">
	<nav class="flex gap-8">
		{#each filteredRoutes as route}
			<Button
				variant="link"
				href="/{route.route}"
				on:click={close}
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
