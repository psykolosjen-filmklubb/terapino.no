<script lang="ts">
	import { urlFor } from '$lib/utils/image';

	export let data;
</script>

<section class="grid place-items-center gap-8 px-2">
	<div class="max-w-56 lg:max-w-80">
		<img src={urlFor(data.logo.image).width(512).height(512).url()} alt="Logo" />
	</div>
</section>
