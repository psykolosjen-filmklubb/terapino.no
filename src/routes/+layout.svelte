<script>
	import Header from "$lib/components/Header/Header.svelte";
	import { Button } from "$lib/components/ui/button";
	import { siFacebook, siInstagram } from "simple-icons";
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { dev } from "$app/environment";
	import { onNavigate } from "$app/navigation";

	let { data, children } = $props();

	injectAnalytics({ mode: dev ? "development" : "production" });

	onNavigate((navigation) => {
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

<Header logoAssetLight={data.logos.black.image} logoAssetDark={data.logos.white.image}></Header>

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

	:global(.squircle) {
		--squircle-amount: 25%;

		clip-path: shape(
			from 0 var(--squircle-amount),
			curve to var(--squircle-amount) 0 with 0 0 / 0 0,
			hline to calc(100% - var(--squircle-amount)),
			curve to 100% var(--squircle-amount) with 100% 0 / 100% 0,
			vline to calc(100% - var(--squircle-amount)),
			curve to calc(100% - var(--squircle-amount)) 100% with 100% 100% / 100% 100%,
			hline to var(--squircle-amount),
			curve to 0 calc(100% - var(--squircle-amount)) with 0 100% / 0 100%,
			close
		);
	}
</style>
