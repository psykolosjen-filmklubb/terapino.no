export const routes: Record<string, route> = {
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
