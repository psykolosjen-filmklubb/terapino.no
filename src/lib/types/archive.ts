export type Movie = {
	title: string;
	year: number;
	director: string;
};

export type Semester = {
	name: string;
	startDate: string;
	color: string;
	movies: Movie[];
};

export type Archive = Semester[];
