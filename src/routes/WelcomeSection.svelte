<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	type Props = {
		recruitingActive: boolean;
	};

	let { recruitingActive }: Props = $props();
</script>

<section
	class="flex w-full flex-col items-center px-2 py-8 lg:flex-row lg:justify-evenly lg:px-6 lg:py-16"
>
	<div class="lg:flex lg:flex-col">
		<h1
			class="scroll-m-20 text-center text-2xl font-extrabold tracking-tight lg:text-left lg:text-4xl"
		>
			Velkommen
		</h1>
		<p class="px-4 text-center lg:px-0 lg:text-left">
			Her kan du se kommende visninger vi arrangerer og lese våre film-anmeldelser.
		</p>

		{#if recruitingActive}
			<p class="mt-12 text-center text-xl lg:mt-16">Vil du være med i filmklubben?</p>
			<div class="mt-2 mb-12 flex justify-center">
				<Button href="/bli-med" size="lg" class="">Søk nå!</Button>
			</div>
		{/if}
	</div>
</section>
