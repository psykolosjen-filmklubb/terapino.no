import type { Archive } from '$lib/types/archive';

const archive: Archive = [
	{
		id: 'first',
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
		id: 'second',
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
	},
	{
		id: 'third',
		year: 2022,
		season: 'vår',
		color: '#00c9dd',
		movies: [
			{
				title: 'Climax',
				year: 2018,
				director: 'Gaspar Noe'
			},
			{
				title: 'Taxi Driver',
				year: 1976,
				director: 'Martin Scorsese'
			},
			{
				title: 'A Silent Voice',
				year: 2016,
				director: 'Naoko Yamada'
			},
			{
				title: 'The Cook, the Thief, His Wife & Her Lover',
				year: 1989,
				director: 'Peter Greenway'
			},
			{
				title: 'Barn',
				year: 2019,
				director: 'Dag Johan Haugerud'
			},
			{
				title: 'Shrek 2',
				year: 2014,
				director: 'Andrew Adamson, Kelly Asbury, Conrad Vernon'
			}
		]
	}
];

export function load() {
	return { archive };
}
