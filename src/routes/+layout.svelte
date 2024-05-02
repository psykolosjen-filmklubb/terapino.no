<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { urlFor } from '$lib/sanity/image';
	import { siFacebook, siInstagram } from 'simple-icons';
	import '../app.pcss';
	import NavLinks from '$lib/components/NavLinks.svelte';
	import { routes } from '$lib/routes';
	import { ModeWatcher, mode } from 'mode-watcher';

	export let data;

	let currentTitle = '';
	$: {
		let tempTitle = 'Psykolosjen Filmklubb';
		Object.values(routes).forEach((route) => {
			if ($page.url.pathname.startsWith('/' + route.route)) {
				tempTitle = route.title;
			}
		});
		currentTitle = tempTitle;
	}
</script>

<ModeWatcher />

<header
	class="flex h-16 w-full place-content-between items-center border-b bg-muted px-4 lg:h-44 lg:px-8"
>
	<div class="flex items-center gap-8">
		<a href="/" class="size-10 lg:size-32">
			{#if $mode === 'light'}
				<img src={urlFor(data.logos.black.image).width(512).height(512).url()} alt="Logo" />
			{:else}
				<img src={urlFor(data.logos.white.image).width(512).height(512).url()} alt="Logo" />
			{/if}
		</a>
		<h1 class="scroll-m-20 text-left text-xl font-bold tracking-tight lg:text-5xl">
			{currentTitle}
		</h1>
	</div>

	<NavLinks />
</header>

<main class="flex flex-col items-center justify-center">
	<slot />
</main>

<footer class="sticky top-[100vh] border-t bg-muted py-6 text-muted-foreground lg:py-10">
	<div class="mb-4 flex justify-center gap-10 lg:mb-8">
		<Button
			href="https://www.instagram.com/quentin_terapino"
			class="bg-[#d62976] text-white hover:bg-[#d62977d0]"
		>
			<svg class="mr-2 h-4 w-4 fill-white">
				{@html siInstagram.svg}
			</svg>
			Instagram
		</Button>
		<Button
			href="https://www.facebook.com/quentin.terapino"
			class="bg-[#3b5998] text-white hover:bg-[#3b5898c7]"
		>
			<svg class="mr-2 h-4 w-4 fill-white">
				{@html siFacebook.svg}
			</svg>
			Facebook
		</Button>
	</div>
	<p class="text-center">Psykolosjen Filmklubb</p>
	<p class="text-center">
		© {new Date().getFullYear()}
	</p>
</footer>

<style>
	:global(body) {
		min-height: 100vh;
	}
</style>
