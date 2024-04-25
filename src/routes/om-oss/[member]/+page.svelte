<script lang="ts">
	import Memberships from '$lib/components/Memberships.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { urlFor } from '$lib/sanity/image';

	export let data;

	$: nameList = data.member.name.split(' ');
	$: fallback = nameList[0].substring(0, 1) + nameList.slice(-1)[0].substring(0, 1);
</script>

<h1 class="my-4 scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
	{data.member.name}
</h1>

<Avatar.Root class="mx-auto my-4 size-48">
	{#if data.member.image}
		<Avatar.Image src={urlFor(data.member.image).width(384).height(384).url()} />
	{/if}
	<Avatar.Fallback>
		{fallback}
	</Avatar.Fallback>
</Avatar.Root>

{#if data.member.memberships}
	<article class="my-4 w-full px-4">
		<Memberships memberships={data.member.memberships} />
	</article>
{/if}
