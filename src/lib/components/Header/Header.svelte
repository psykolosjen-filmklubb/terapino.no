<script lang="ts">
	import { run } from "svelte/legacy";

	import { page } from "$app/stores";
	import { urlFor } from "$lib/sanity/image";
	import NavLinks from "$lib/components/Header/NavLinks.svelte";
	import { routes } from "$lib/routes";
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
		<a href="/" class="block size-10 lg:size-32" aria-label="Gå til forsiden">
			<img
				class="logo logo-light"
				src={urlFor(logoAssetLight).width(512).height(512).url()}
				alt=""
				aria-hidden="true"
			/>
			<img
				class="logo logo-dark"
				src={urlFor(logoAssetDark).width(512).height(512).url()}
				alt=""
				aria-hidden="true"
			/>
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

<style>
	header {
		view-transition-name: header;
	}

	.logo {
		display: block;
	}

	.logo-dark {
		display: none;
	}

	:global(.dark) .logo-light {
		display: none;
	}

	:global(.dark) .logo-dark {
		display: block;
	}
</style>
