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
			}
		]
	}
];

export function load() {
	return { archive };
}
