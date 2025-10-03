<script lang="ts">
	import { run } from "svelte/legacy";

	import { page } from "$app/stores";
	import { urlFor } from "$lib/sanity/image";
	import NavLinks from "$lib/components/Header/NavLinks.svelte";
	import { routes } from "$lib/routes";
	import { mode } from "mode-watcher";
	import type { ImageAsset } from "@sanity/types";

	interface Props {
		logoAssetLight: ImageAsset;
		logoAssetDark: ImageAsset;
	}

	let { logoAssetLight, logoAssetDark }: Props = $props();

	let currentTitle = $state("");
	let currentRoute = $state("");

	run(() => {
		let tempTitle = "Psykolosjen Filmklubb";
		Object.values(routes).forEach((route) => {
			if ($page.url.pathname.startsWith("/" + route.route)) {
				tempTitle = route.title;
				currentRoute = route.route;
			}
		});
		currentTitle = tempTitle;
	});
</script>

<header
	class="sticky top-0 z-50 flex h-16 w-full place-content-between items-center border-b bg-muted px-4 lg:h-44 lg:px-8"
>
	<div class="mr-8 flex items-center gap-8">
		<a href="/" class="size-10 lg:size-32">
			{#if mode.current === "light"}
				<img src={urlFor(logoAssetLight).width(512).height(512).url()} alt="Logo" />
			{:else}
				<img src={urlFor(logoAssetDark).width(512).height(512).url()} alt="Logo" />
			{/if}
		</a>
		{#if currentTitle != "Psykolosjen Filmklubb"}
			<a
				href="/{currentRoute}"
				class="scroll-m-20 text-left text-xl font-bold tracking-tight lg:text-5xl"
			>
				{currentTitle}
			</a>
		{:else}
			<h1 class="scroll-m-20 text-left text-xl font-bold tracking-tight lg:text-5xl">
				{currentTitle}
			</h1>
		{/if}
	</div>

	<NavLinks />
</header>
