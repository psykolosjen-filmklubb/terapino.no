<script lang="ts">
	import type { Archive } from '$lib/types/archive';
	import Semester from './Semester.svelte';

	export let archive: Archive;
</script>

{#each archive as semester, i}
	<Semester {semester} directionParam={i % 2 === 0 ? 'left' : 'right'} />
{/each}
