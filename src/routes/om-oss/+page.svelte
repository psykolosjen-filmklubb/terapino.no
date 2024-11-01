<script>
	import HeroImage from '$lib/components/HeroImage.svelte';
	import MemberTag from '$lib/components/MemberTag.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { PortableText } from '@portabletext/svelte';

	let { data } = $props();
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
		<h2
			class="mb-2 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Medlemmer
		</h2>
		<div class="grid gap-4">
			{#each data.rolesWithMembers as roleWithMembers, i}
				<div>
					<h3 class="text-lg font-thin tracking-tight">
						{roleWithMembers.role.toUpperCase()}
					</h3>
					<div class="grid gap-2">
						{#each roleWithMembers.members as member}
							<MemberTag {member} />
						{/each}
					</div>
					{#if i !== data.rolesWithMembers.length - 1}
						<Separator class="mt-4" />
					{/if}
				</div>
			{/each}
		</div>
	</article>
{/if}
