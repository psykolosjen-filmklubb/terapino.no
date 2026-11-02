<script>
	import Header from "#lib/components/Header/Header.svelte";
	import { Button } from "#lib/components/ui/button/index.js";
	import { siFacebook, siInstagram } from "simple-icons";
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";
	import { inject, pageview } from "@vercel/analytics";
	import { browser, dev } from "$app/env";
	import { onNavigate } from "$app/navigation";
	import { page } from "$app/state";

	let { data, children } = $props();

	// @vercel/analytics/sveltekit still imports $app/stores, which SvelteKit 3 removed,
	// so this mirrors what its injectAnalytics() does using $app/state instead.
	if (browser) {
		inject(
			{
				mode: dev ? "development" : "production",
				basePath: import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH,
				disableAutoTrack: true,
				framework: "sveltekit",
			},
			import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG,
		);
	}

	$effect(() => {
		if (page.route.id) {
			pageview({ route: page.route.id, path: page.url.pathname });
		}
	});

	onNavigate((navigation) => {
		if (navigation.shallow && navigation.type === "goto") return;
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<ModeWatcher />

<Header logoAssetLight={data.logos.black.image} logoAssetDark={data.logos.white.image} />

<main class="mx-auto flex flex-col items-center justify-center lg:max-w-screen-2xl">
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
