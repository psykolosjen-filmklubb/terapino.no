<script lang="ts">
	export let data;
</script>

<h1>Psykolosjen Filmklubb</h1>

{#if data.authors && data.authors.length > 0}
	<ul>
		{#each data.authors as author}
			<li>{author.name}</li>
		{/each}
	</ul>
{:else}
	<p>No authors found</p>
{/if}
