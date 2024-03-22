<script lang="ts">
	import { siImdb } from 'simple-icons';
	import { Button } from './ui/button';

	export let imdbId: string;
</script>

<Button
	href="https://www.imdb.com/title/{imdbId}"
	class="bg-[#f5c518] hover:bg-[#f5c518d0]"
	size="icon"
>
	<svg class="h-7 w-7 fill-black">
		{@html siImdb.svg}
	</svg>
</Button>
