<script lang="ts">
	import type { Archive } from '$lib/types/archive';
	import Semester from './Semester.svelte';

	export let archive: Archive;
</script>

<Semester semester={archive[0]} directionParam="left" />

<Semester semester={archive[0]} directionParam="right" />
