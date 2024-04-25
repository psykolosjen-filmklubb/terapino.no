<script lang="ts">
	import { dateFormatterMonthYear } from '$lib/dateFormatters';
	import * as Accordion from '$lib/components/ui/accordion';
	import type { Membership } from '$lib/sanity/types';

	export let memberships: Membership[];

	$: activeMembership = memberships.find((membership) => membership.to_date === null);
	$: otherMemberships = memberships.filter((membership) => membership !== activeMembership);
</script>

{#if memberships.length === 1}
	<p class="font-medium">
		{#if activeMembership}
			Medlem siden {dateFormatterMonthYear.format(new Date(activeMembership.from_date))}
		{:else}
			Var medlem fra
			{dateFormatterMonthYear.format(new Date(memberships[0].from_date))}
			til
			{memberships[0].to_date
				? dateFormatterMonthYear.format(new Date(memberships[0].to_date))
				: 'nå'}
		{/if}
	</p>
{:else}
	<Accordion.Root>
		<Accordion.Item value="item-1">
			<Accordion.Trigger>
				{#if activeMembership}
					Medlem siden {dateFormatterMonthYear.format(new Date(activeMembership.from_date))}
				{:else}
					Tidligere medlem
				{/if}
			</Accordion.Trigger>
			<Accordion.Content>
				<ul>
					{#each otherMemberships as membership}
						<li>
							Var medlem fra {dateFormatterMonthYear.format(new Date(membership.from_date))}
							til
							{membership.to_date
								? dateFormatterMonthYear.format(new Date(membership.to_date))
								: 'nå'}
						</li>
					{/each}
				</ul>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
{/if}
