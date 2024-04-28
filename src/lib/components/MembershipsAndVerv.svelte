<script lang="ts">
	import { dateFormatterMonthYear } from '$lib/dateFormatters';
	import * as Accordion from '$lib/components/ui/accordion';
	import type { Membership, Verv } from '$lib/sanity/types';
	import { Badge } from '$lib/components/ui/badge';

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
				<span class="flex gap-2">
					{#each activeVervs as verv, i}
						<Badge>{verv.role}</Badge>
					{/each}
				</span>
			{:else if activeMembership}
				Medlem siden {dateFormatterMonthYear.format(new Date(activeMembership.from_date))}
			{:else}
				Tidligere medlem
			{/if}
		</Accordion.Trigger>
		<Accordion.Content>
			<ul>
				{#each sortedMembershipsAndVervs as membershipOrVerv}
					<li class="my-2 pl-4">
						{#if 'role' in membershipOrVerv}
							<p class="pl-4">
								{#if membershipOrVerv.to_date}
									<Badge>{membershipOrVerv.role}</Badge>
									fra
									{dateFormatterMonthYear.format(new Date(membershipOrVerv.from_date))}
									til
									{dateFormatterMonthYear.format(new Date(membershipOrVerv.to_date))}
								{:else}
									<Badge class="bg-background text-foreground hover:bg-background hover:ring-1">
										{membershipOrVerv.role}
									</Badge>
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
