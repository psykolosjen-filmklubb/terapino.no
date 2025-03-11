export const routes: Record<string, route> = {
	bli_med: {
		route: 'bli-med',
		title: 'Søk filmklubben'
	},
	anmeldelser: {
		route: 'anmeldelser',
		title: 'Anmeldelser'
	},
	arkiv: {
		route: 'arkiv',
		title: 'Visningsarkiv'
	},
	bilder: {
		route: 'bilder',
		title: 'Bilder'
	},
	om_oss: {
		route: 'om-oss',
		title: 'Om oss'
	}
} as const;

type route = {
	route: string;
	title: string;
};
