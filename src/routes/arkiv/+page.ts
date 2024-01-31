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
	},
	{
		year: 2021,
		season: 'høst',
		color: '#ed220d',
		movies: [
			{
				title: 'Promising Young Woman',
				year: 2020,
				director: 'Emerald Fennell'
			},
			{
				title: 'Dune',
				year: 2021,
				director: 'Denis Villeneuve'
			},
			{
				title: 'Verdens verste menneske',
				year: 2021,
				director: 'Joachim Trier'
			},
			{
				title: 'Høstsonaten',
				year: 1978,
				director: 'Ingmar Bergman'
			}
		]
	}
];

export function load() {
	return { archive };
}
