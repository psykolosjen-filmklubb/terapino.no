<script lang="ts">
	import { page } from "$app/state";
	import { Button } from "$lib/components/ui/button";
	import { routes } from "$lib/routes";
	import CountdownLeader from "./CountdownLeader.svelte";

	// Seksjonen brukeren var i, slik at vi kan tilby veien tilbake dit.
	let section = $derived(
		Object.values(routes).find((route) => page.url.pathname.startsWith("/" + route.route)),
	);

	let isNotFound = $derived(page.status === 404);
	let heading = $derived(
		isNotFound
			? "Vi spolte fram og tilbake, men her var det ingenting å se."
			: "Noe røyk i framviseren",
	);
</script>

<section class="flex w-full max-w-3xl flex-col items-center px-4 py-12 text-center lg:py-20">
	{#if isNotFound}
		<CountdownLeader class="w-48 lg:w-72" />
	{/if}

	<p class="mt-8 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
		Rull {page.status} · {isNotFound ? "Ingen visning" : "Visningen stoppet"}
	</p>

	<h2 class="mt-3 scroll-m-20 text-3xl font-bold tracking-tight text-balance lg:text-5xl">
		{heading}
	</h2>

	{#if isNotFound}
		<p class="mt-4 max-w-full text-sm text-muted-foreground">
			Du lette etter
			<code class="rounded-md bg-muted px-2 py-1 break-all">{page.url.pathname}</code>
		</p>
	{:else}
		<p class="mt-4 text-lg text-balance text-muted-foreground lg:text-xl">
			{page.error?.message ?? "Ukjent feil i maskinrommet."}
		</p>
	{/if}

	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<Button href="/">Tilbake til forsiden</Button>
		{#if section}
			<Button variant="outline" href="/{section.route}">{section.title}</Button>
		{/if}
	</div>
</section>
