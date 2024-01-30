import type { Archive } from '$lib/types/archive';

const archive: Archive = [
	{
		year: 2021,
		season: 'vår',
		color: '#00c9dd',
		movies: [
			{
				title: 'Moonlight',
				year: 2016,
				director: 'Barry Jenkins'
			},
			{
				title: 'Portrait of a Lady on Fire',
				year: 2019,
				director: 'Celine Sciamma'
			}
		]
	}
];

export function load() {
	return { archive };
}
