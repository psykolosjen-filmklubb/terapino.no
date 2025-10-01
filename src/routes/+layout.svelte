<script>
	import Header from '$lib/components/Header/Header.svelte';
	import { Button } from '$lib/components/ui/button';
	import { siFacebook, siInstagram } from 'simple-icons';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { dev } from '$app/environment';

	let { data, children } = $props();

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<ModeWatcher />

<Header logoAssetLight={data.logos.black.image} logoAssetDark={data.logos.white.image}></Header>

<main class="flex flex-col items-center justify-center">
	{@render children?.()}
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
