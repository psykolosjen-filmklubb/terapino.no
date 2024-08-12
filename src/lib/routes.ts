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
	om_oss: {
		route: 'om-oss',
		title: 'Om oss'
	}
} as const;

type route = {
	route: string;
	title: string;
};
