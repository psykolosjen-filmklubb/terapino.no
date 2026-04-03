<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { getMemberInitials } from "$lib/getMemberInitials";
	import type { MemberSummary } from "$lib/types/member";

	interface Props {
		member: MemberSummary;
		avatarClass?: string;
		style?: string;
	}

	let { member, avatarClass = "", style = "" }: Props = $props();

	let fallback = $derived(getMemberInitials(member.name));
</script>

<Avatar.Root class={avatarClass} {style}>
	<Avatar.Image src={member.avatarUrl} />
	<Avatar.Fallback>{fallback}</Avatar.Fallback>
</Avatar.Root>
