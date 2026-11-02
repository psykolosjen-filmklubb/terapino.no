<script lang="ts">
	import * as Avatar from "#lib/components/ui/avatar/index.js";
	import { getMemberInitials } from "#lib/getMemberInitials.js";
	import type { MemberSummary } from "#lib/types/member.js";

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
