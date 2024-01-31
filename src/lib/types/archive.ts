export type Movie = {
	title: string;
	year: number;
	director: string;
};

export type Semester = {
	id: string;
	year: number;
	season: 'vår' | 'høst';
	color: string;
	movies: Movie[];
};

export type Archive = Semester[];
