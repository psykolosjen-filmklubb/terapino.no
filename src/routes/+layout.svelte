<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { urlFor } from '$lib/utils/image';
	import '../app.pcss';

	export let data;

	const routes = { anmeldelser: 'Anmeldelser', arkiv: 'Visningsarkiv' };

	$: currentRoute = $page.route.id ?? '';
	let currentTitle = '';
	$: {
		let tempTitle = 'Psykolosjen Filmklubb';
		Object.entries(routes).forEach(([route, title]) => {
			if (currentRoute.includes(route)) {
				tempTitle = title;
			}
		});
		currentTitle = tempTitle;
	}
</script>

<header class="flex h-16 w-full place-content-between items-center bg-muted px-4 lg:h-44 lg:px-8">
	<div class="flex items-center gap-8">
		<a href="/" class="size-10 lg:size-32">
			<img src={urlFor(data.logo.image).width(512).height(512).url()} alt="Logo" />
		</a>
		<h1 class="hidden scroll-m-20 text-left text-5xl font-bold tracking-tight lg:block">
			{currentTitle}
		</h1>
	</div>

	<span class="flex gap-2">
		{#each Object.entries(routes) as [route, name]}
			<Button
				href="/{route}"
				variant="link"
				class="p-0 {currentRoute?.includes(route) ? 'font-medium' : 'font-light'}">{name}</Button
			>
		{/each}
	</span>
</header>

<main class="flex flex-col items-center justify-center">
	<slot />
</main>
