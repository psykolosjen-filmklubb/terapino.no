<script lang="ts">
	import { siImdb } from 'simple-icons';
	import { Button } from './ui/button';

	interface Props {
		imdbId: string;
	}

	let { imdbId }: Props = $props();
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
