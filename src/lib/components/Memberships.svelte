<script lang="ts">
	import { dateFormatterMonthYear } from '$lib/dateFormatters';
	import * as Accordion from '$lib/components/ui/accordion';
	import type { Membership, Verv } from '$lib/sanity/types';

	export let memberships: Membership[];
	export let verv: Verv[] = [];

	$: activeVervs = verv.filter((verv) => verv.to_date === null);
	$: activeMembership = memberships.find((membership) => membership.to_date === null);

	let sortedMembershipsAndVervs: (Membership | Verv)[] = [];
	$: sortedMembershipsAndVervs = [...memberships, ...verv].sort(
		(a, b) => new Date(b.from_date).getTime() - new Date(a.from_date).getTime()
	);
</script>

<Accordion.Root>
	<Accordion.Item value="item-1">
		<Accordion.Trigger>
			{#if activeVervs.length > 0}
				{#each activeVervs as verv, i}
					{verv.role +
						(i < activeVervs.length - 2 ? ', ' : i < activeVervs.length - 1 ? ' og ' : '')}
				{/each}
			{:else if activeMembership}
				Medlem siden {dateFormatterMonthYear.format(new Date(activeMembership.from_date))}
			{:else}
				Tidligere medlem
			{/if}
		</Accordion.Trigger>
		<Accordion.Content>
			<ul>
				{#each sortedMembershipsAndVervs as membershipOrVerv}
					<li class="pl-4">
						{#if 'role' in membershipOrVerv}
							<p class="pl-4">
								{#if membershipOrVerv.to_date}
									{membershipOrVerv.role}
									fra
									{dateFormatterMonthYear.format(new Date(membershipOrVerv.from_date))}
									til
									{dateFormatterMonthYear.format(new Date(membershipOrVerv.to_date))}
								{:else}
									{membershipOrVerv.role}
									siden
									{dateFormatterMonthYear.format(new Date(membershipOrVerv.from_date))}
								{/if}
							</p>
						{:else if membershipOrVerv.to_date}
							Var medlem fra
							{dateFormatterMonthYear.format(new Date(membershipOrVerv.from_date))}
							til
							{dateFormatterMonthYear.format(new Date(membershipOrVerv.to_date))}
						{:else}
							Medlem siden {dateFormatterMonthYear.format(new Date(membershipOrVerv.from_date))}
						{/if}
					</li>
				{/each}
			</ul>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
