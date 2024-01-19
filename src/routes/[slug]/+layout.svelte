<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex max-w-lg flex-col place-items-center">
	<Button variant="link" href="/" class="place-self-start p-0">Tilbake</Button>
	<slot />
</div>
