<script lang="ts">
	import { page } from '$app/stores';

	$: src = $page.data.settings.recruiting.recruiting_form;
</script>

<iframe
	title="Skjema for å søke filmklubben"
	{src}
	class="h-[200rem] w-full border-0 lg:h-[170rem] lg:max-w-2xl"
>
	Laster inn…
</iframe>
