<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="grid max-w-screen-lg">
	<Button variant="link" href="/" class="place-self-start p-0">Tilbake</Button>
	<slot />
</div>
<footer class="m-20" />
