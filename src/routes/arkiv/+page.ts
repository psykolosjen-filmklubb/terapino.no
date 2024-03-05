import type { Archive } from '$lib/types/archive';

const archive: Archive = [
	{
		name: 'vår 2021',
		startDate: '2021-01-01',
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
		name: 'høst 2021',
		startDate: '2021-08-01',
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
		name: 'vår 2022',
		startDate: '2022-01-01',
		color: '#00de8f',
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
	},
	{
		name: 'høst 2022',
		startDate: '2022-08-01',
		color: '#006fea',
		movies: [
			{
				title: 'Dazed and Confused',
				year: 1993,
				director: 'Richard Linklater'
			},
			{
				title: 'Syk pike',
				year: 2022,
				director: 'Kristoffer Borgli'
			},
			{
				title: 'Before Sunrise',
				year: 1995,
				director: 'Richard Linklater'
			},
			{
				title: 'Fantastic Mr. Fox',
				year: 2009,
				director: 'Wes Anderson'
			},
			{
				title: 'SKAM sesong 3',
				year: 2016,
				director: 'Julie Andem'
			},
			{
				title: 'Apicalypse Now',
				year: 1979,
				director: 'Francis Ford Coppola'
			},
			{
				title: 'Solan og Ludvig - Jul i Flåklypa',
				year: 2013,
				director: 'Rasmus A. Sivertsen'
			},
			{
				title: 'Når nettene blir lange',
				year: 2000,
				director: 'Mona J. Hoel'
			}
		]
	},
	{
		name: 'vår 2023',
		startDate: '2023-01-01',
		color: '#ff00d1',
		movies: [
			{
				title: 'The Handmaiden',
				year: 2016,
				director: 'Park Chan-wook'
			},
			{
				title: 'The Babadook',
				year: 2014,
				director: 'Jennifer Kent'
			},
			{
				title: 'Stigma',
				year: 2022,
				director: 'Marius Mellem'
			},
			{
				title: 'Persona',
				year: 1966,
				director: 'Ingmar Bergman'
			},
			{
				title: 'Perfect Blue',
				year: 1997,
				director: 'Satoshi Kon'
			},
			{
				title: 'The Conformist',
				year: 1970,
				director: 'Bernardo Bertolucci'
			},
			{
				title: 'Shame',
				year: 2011,
				director: 'Steve McQueen'
			},
			{
				title: 'Kill Bill: Vol. 1',
				year: 2003,
				director: 'Quentin Tarantino'
			},
			{
				title: 'Kill Bill: Vol. 2',
				year: 2004,
				director: 'Quentin Tarantino'
			}
		]
	},
	{
		name: 'høst 2023',
		startDate: '2023-08-01',
		color: '#f48c00',
		movies: [
			{
				title: 'Parasite',
				year: 2019,
				director: 'Bong Joon-ho'
			},
			{
				title: 'City of God',
				year: 2002,
				director: 'Fernando Meirelles, Kátia Lund'
			},
			{
				title: 'Hereditary',
				year: 2018,
				director: 'Ari Aster'
			},
			{
				title: 'Love According to Dalva',
				year: 2022,
				director: 'Emmanuelle Nicot'
			},
			{
				title: 'Three Colours: Red',
				year: 1994,
				director: 'Krzysztof Kieślowski'
			}
		]
	},
	{
		name: 'vår 2024',
		startDate: '2024-01-01',
		color: '#c0db00',
		movies: [
			{
				title: 'Menn som hater kvinner',
				year: 2009,
				director: 'Niels Arden Oplev'
			},
			{
				title: 'Fallen Angels',
				year: 1995,
				director: 'Wong Kar-wai'
			},
			{
				title: 'Dune: Part Two',
				year: 2024,
				director: 'Denis Villeneuve'
			}
		]
	}
];

export function load() {
	return {
		archive: archive.sort(
			(a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
		)
	};
}
