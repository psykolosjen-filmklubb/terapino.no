<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = "" }: Props = $props();

	// Unike id-er, slik at flere ledere på samme side ikke deler defs.
	const uid = $props.id();
</script>

<svg
	viewBox="0 0 400 400"
	class="leader text-foreground {className}"
	role="img"
	aria-label="Nedtellingsbilde med tallet 404"
>
	<defs>
		<clipPath id="{uid}-clip">
			<circle cx="200" cy="200" r="192" />
		</clipPath>
		<filter id="{uid}-grain">
			<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
			<feColorMatrix type="saturate" values="0" />
		</filter>
	</defs>

	<g clip-path="url(#{uid}-clip)">
		<path class="sweep" d="M200 200 L200 0 A200 200 0 0 1 400 200 Z" fill="currentColor" />

		<g fill="none" stroke="currentColor" stroke-width="2">
			<line x1="200" y1="0" x2="200" y2="400" opacity="0.45" />
			<line x1="0" y1="200" x2="400" y2="200" opacity="0.45" />
			<circle cx="200" cy="200" r="140" opacity="0.3" />
			<circle cx="200" cy="200" r="92" opacity="0.18" />
		</g>

		<text class="numeral" x="200" y="200" text-anchor="middle" dominant-baseline="central">
			404
		</text>

		<g class="scratches" stroke="currentColor" stroke-width="1.5">
			<line class="scratch-a" x1="0" y1="-20" x2="7" y2="420" />
			<line class="scratch-b" x1="0" y1="-20" x2="-9" y2="420" />
		</g>

		<rect width="400" height="400" filter="url(#{uid}-grain)" opacity="0.14" />
	</g>

	<circle cx="200" cy="200" r="192" fill="none" stroke="currentColor" stroke-width="5" />
	<circle class="cue" cx="352" cy="48" r="20" fill="none" stroke="currentColor" stroke-width="4" />
</svg>

<style>
	.sweep {
		opacity: 0.08;
	}

	.numeral {
		fill: currentColor;
		font-size: 150px;
		font-weight: 800;
		letter-spacing: -6px;
	}

	.scratches {
		opacity: 0;
	}

	.cue {
		opacity: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.leader {
			animation: gate-weave 0.5s steps(2, end) infinite;
		}

		.sweep {
			transform-box: view-box;
			transform-origin: 200px 200px;
			animation: sweep 2.4s linear infinite;
		}

		.numeral {
			animation: flicker 2.4s steps(1, end) infinite;
		}

		.scratches {
			opacity: 1;
		}

		.scratch-a {
			animation: scratch-a 3.1s steps(1, end) infinite;
		}

		.scratch-b {
			animation: scratch-b 4.7s steps(1, end) infinite;
		}

		/* Merket som varsler framviseren om at rullen snart er slutt. */
		.cue {
			animation: cue 2.4s steps(1, end) infinite;
		}
	}

	@keyframes sweep {
		to {
			rotate: 360deg;
		}
	}

	@keyframes gate-weave {
		0% {
			translate: 0 0;
		}
		50% {
			translate: 0.5px -0.5px;
		}
	}

	@keyframes flicker {
		0%,
		70% {
			opacity: 1;
		}
		72% {
			opacity: 0.72;
		}
		74%,
		100% {
			opacity: 1;
		}
	}

	@keyframes scratch-a {
		0%,
		30% {
			translate: 96px 0;
			opacity: 0.22;
		}
		31%,
		62% {
			translate: 268px 0;
			opacity: 0.12;
		}
		63%,
		100% {
			translate: 151px 0;
			opacity: 0.28;
		}
	}

	@keyframes scratch-b {
		0%,
		45% {
			translate: 312px 0;
			opacity: 0.1;
		}
		46%,
		80% {
			translate: 64px 0;
			opacity: 0.2;
		}
		81%,
		100% {
			translate: 223px 0;
			opacity: 0.14;
		}
	}

	@keyframes cue {
		0%,
		92% {
			opacity: 0;
		}
		93%,
		100% {
			opacity: 0.55;
		}
	}
</style>
