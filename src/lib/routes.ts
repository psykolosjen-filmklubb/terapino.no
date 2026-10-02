import type { RouteId } from "$app/types";

export const routes = {
	bli_med: {
		route: "/bli-med",
		title: "Søk filmklubben",
	},
	anmeldelser: {
		route: "/anmeldelser",
		title: "Anmeldelser",
	},
	arkiv: {
		route: "/arkiv",
		title: "Visningsarkiv",
	},
	bilder: {
		route: "/bilder",
		title: "Bilder",
	},
	om_oss: {
		route: "/om-oss",
		title: "Om oss",
	},
} as const satisfies Record<string, { route: RouteId; title: string }>;

export type SiteRoute = (typeof routes)[keyof typeof routes];
