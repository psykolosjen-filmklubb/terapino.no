<script>
	import AuthorList from '$lib/components/AuthorList.svelte';
	import HeroImage from '$lib/components/HeroImage.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data;
</script>

{#if data.content.header_image.asset}
	<HeroImage
		thumbnail={data.content.header_image.asset}
		thumbnailBlurhash={data.content.header_image.blurhash}
	/>
{/if}

{#if data.content.main_text}
	<article class="prose mx-auto mt-8 px-8 dark:prose-invert lg:prose-lg lg:px-0">
		<PortableText value={data.content.main_text} />
	</article>
{/if}

{#if data.rolesWithMembers}
	<article class="my-8 px-8 lg:mx-auto lg:max-w-screen-sm">
		<h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
			Styret:
		</h2>
		{#each data.rolesWithMembers as role}
			<AuthorList authors={role.members} heading={role.role} />
		{/each}
	</article>
{/if}
