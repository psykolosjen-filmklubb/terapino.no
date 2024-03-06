import type { Slug } from '@sanity/types';

export type Movie = {
	title: string;
	year: number;
	director: string;
	slug: Slug;
};

export type Semester = {
	name: string;
	startDate: string;
	color: string;
	movies: Movie[];
};

export type Archive = Semester[];
