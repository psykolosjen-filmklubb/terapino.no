<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { urlFor } from '$lib/utils/image';
	import { siFacebook, siInstagram } from 'simple-icons';
	import '../app.pcss';
	import NavLinks from '$lib/components/NavLinks.svelte';
	import { routes } from './routes';

	export let data;

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

	<NavLinks />
</header>

<main class="flex flex-col items-center justify-center">
	<slot />
</main>

<footer class="bg-primary py-6 lg:py-10">
	<div class="mb-4 flex justify-center gap-10 lg:mb-8">
		<Button
			href="https://www.instagram.com/quentin_terapino"
			class="bg-[#d62976] text-primary-foreground hover:bg-[#d62977d0]"
		>
			<svg class="mr-2 h-4 w-4 fill-primary-foreground">
				{@html siInstagram.svg}
			</svg>
			Instagram
		</Button>
		<Button
			href="https://www.facebook.com/quentin.terapino"
			class="bg-[#3b5998] text-primary-foreground hover:bg-[#3b5898c7]"
		>
			<svg class="mr-2 h-4 w-4 fill-primary-foreground">
				{@html siFacebook.svg}
			</svg>
			Facebook
		</Button>
	</div>
	<p class="text-center text-primary-foreground">Psykolosjen Filmklubb</p>
	<p class="text-center text-primary-foreground">
		© {new Date().getFullYear()}
	</p>
</footer>
