<script lang="ts">
	import { Play } from 'lucide-svelte';
	import { Button } from '../ui/button';

	interface Props {
		youtubeId: string;
	}

	let { youtubeId }: Props = $props();
</script>

<a
	data-pswp-type="youtube"
	data-youtube-url="https://www.youtube-nocookie.com/embed/{youtubeId}"
	href="https://youtu.be/{youtubeId}"
	target="_blank"
	class="relative"
>
	<img
		src="https://i.ytimg.com/vi/{youtubeId}/maxresdefault.jpg"
		alt="Youtube video thumbnail"
		referrerpolicy="no-referrer"
		class="aspect-video w-full"
	/>
	<Button
		variant="outline"
		size="icon"
		class="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-0 bg-opacity-50"
	>
		<Play class="ml-1 size-8" />
		<span class="sr-only">Åpne video</span>
	</Button>
</a>
