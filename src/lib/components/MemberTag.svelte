<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { urlFor } from "$lib/sanity/image";
	import type { Member } from "./AuthorList.svelte";

	interface Props {
		member: Member;
	}

	let { member }: Props = $props();

	let nameList = $derived(member.name.split(" "));
	let fallback = $derived(nameList[0].substring(0, 1) + nameList.slice(-1)[0].substring(0, 1));
</script>

<a
	href="/om-oss/{nameList.join('-').toLowerCase()}"
	class="flex items-center justify-between hover:underline"
>
	<p class="font-extralight">{member.name}</p>
	<Avatar.Root class="size-16">
		{#if member.image}
			<Avatar.Image src={urlFor(member.image).width(128).height(128).url()} />
		{/if}
		<Avatar.Fallback>
			{fallback}
		</Avatar.Fallback>
	</Avatar.Root>
</a>
