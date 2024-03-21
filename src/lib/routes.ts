export const routes: Record<string, route> = {
	anmeldelser: { route: 'anmeldelser', title: 'Anmeldelser' },
	arkiv: { route: 'arkiv', title: 'Visningsarkiv' }
} as const;

type route = {
	route: string;
	title: string;
};
