<script lang="ts">
	import type { SemesterState } from "./SemesterState.svelte";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	type SemesterLineProps = {
		semester: SemesterState;
		direction: "left" | "right";
	};

	let { semester, direction }: SemesterLineProps = $props();

	const pathX2 = tweened(semester.archive.circleSize / 2, { duration: 500, easing: cubicOut });
	$effect(() => {
		pathX2.set(semester.archive.circleSize / 2 + (semester.open ? semester.lengthOfFirstTitle : 0));
	});
	let pathX3 = $derived($pathX2 + semester.archive.circleSize / 3);
	let pathY2 = $derived(semester.archive.circleSize / 3);
	let pathX4 = $derived(pathX3 + semester.lengthOfName);
	let pathString = $derived(`M 0 0 L ${$pathX2} 0 L ${pathX3} ${pathY2} L ${pathX4} ${pathY2}`);
</script>

<svg
	class="pointer-events-none absolute z-0 stroke-foreground"
	overflow="visible"
	style:left={direction === "right"
		? semester.archive.circleSize - semester.archive.strokeWidth
		: semester.archive.strokeWidth}
	style:top={semester.archive.circleSize / 2 - semester.archive.strokeWidth / 2}
>
	<path
		d={pathString}
		stroke-width={semester.archive.strokeWidth}
		style:transform={direction === "right" ? "" : "scale(-1, 1)"}
		class="z-0"
		fill="none"
	/>
</svg>
<h2
	class="absolute text-lg font-semibold tracking-tight text-nowrap @5xl:text-xl"
	style:bottom={`${semester.archive.circleSize / 6 + semester.archive.strokeWidth / 2}px`}
	style:left={direction === "right"
		? `${pathX3 + semester.archive.circleSize - semester.archive.strokeWidth}px`
		: `${-pathX4 + semester.archive.strokeWidth}px`}
	bind:clientWidth={semester.lengthOfName}
>
	{semester.name.toUpperCase()}
</h2>
