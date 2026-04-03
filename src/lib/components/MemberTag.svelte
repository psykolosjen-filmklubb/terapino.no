<script lang="ts">
	import MemberAvatar from "$lib/components/MemberAvatar.svelte";
	import type { MemberSummary } from "$lib/types/member";

	interface Props {
		member: MemberSummary;
	}

	let { member }: Props = $props();

	let nameList = $derived(member.name.split(" "));
	let nameSlug = $derived(nameList.join("-").toLowerCase());
</script>

<a href="/om-oss/{nameSlug}" class="flex items-center justify-between gap-2 hover:underline">
	<p class="font-extralight" style:--vt-tag="member-name-{nameSlug}">
		{member.name}
	</p>
	<MemberAvatar
		{member}
		avatarClass="size-16"
		style="view-transition-name: member-image-{nameSlug}"
	/>
</a>
