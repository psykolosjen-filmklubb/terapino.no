<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="grid lg:max-w-screen-lg">
	<Button variant="link" href="/" class="hidden place-self-start p-0 lg:inline-flex">Tilbake</Button
	>
	<slot />
</div>
