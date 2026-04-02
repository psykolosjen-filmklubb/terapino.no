<script lang="ts">
	import { siLetterboxd } from "simple-icons";
	import { Button } from "./ui/button";

	interface Props {
		imdbId: string;
	}

	let { imdbId }: Props = $props();
</script>

<Button
	href="https://letterboxd.com/imdb/{imdbId}"
	class="bg-[#2C343F] hover:bg-[#2C343Fd0]"
	size="icon"
>
	<svg class="h-7 w-7 fill-white" viewBox="0 0 24 24">
		<path d={siLetterboxd.path}></path>
	</svg>
</Button>
