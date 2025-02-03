import type { Slug } from '@sanity/types';
import { ArchiveState } from './ArchiveState.svelte';

type Movie = {
	title: string;
	year: number;
	directors: string;
};

export type Screening = {
	movies: Movie[];
	slug: Slug;
};

export type Semester = {
	name: string;
	startDate: string;
	color: string;
	screenings: Screening[];
};

export class SemesterState {
	name: string;
	startDate: string;
	color: string;
	screenings: Screening[];

	index = 0;
	open = $state(false);

	archive: ArchiveState = $state(new ArchiveState([]));

	constructor(semester: Semester, index: number, archive: ArchiveState) {
		this.name = semester.name;
		this.startDate = semester.startDate;
		this.color = semester.color;
		this.screenings = semester.screenings;

		this.index = index;
		this.open = false;

		this.archive = archive;
	}

	lengthOfName = $state(0);
	lengthOfFirstTitle = $state(0);

	titlesHeight = $state(0);

	/**
	 * The margin bottom is derived based on whether the archive is wide or narrow,
	 * and wether the semester is open or closed.
	 *
	 * - If the semester is closed, the margin bottom is always half the size of the archive circle.
	 * - If the archive is narrow, the margin bottom is always the height of the titles.
	 * - If the archive is wide, the margin bottom is half the height of the titles.
	 * - Special case: If the semester is the last one, the margin bottom is the height of the titles to avoid overlap.
	 */
	marginBottom = $derived.by(() => {
		if (!this.open) return this.archive.circleSize / 2;

		if (this.archive.isNarrow) {
			return this.titlesHeight;
		}

		// The last semester don't overlap with the next one
		if (this.index === this.archive.semesters.length - 1) {
			return this.titlesHeight;
		}

		return this.titlesHeight / 2;
	});

	marginTop = $derived.by(() => {
		if (this.index < 2 || this.archive.isNarrow || !this.archive.semesters[this.index - 2].open)
			return 0;

		const spaceToSecondLast: number =
			this.archive.semesters[this.index - 2].marginBottom +
			this.archive.semesters[this.index - 1].marginTop +
			this.archive.circleSize +
			this.archive.semesters[this.index - 1].marginBottom;

		if (spaceToSecondLast < this.archive.semesters[this.index - 2].titlesHeight) {
			return this.archive.semesters[this.index - 2].titlesHeight - spaceToSecondLast;
		}

		return 0;
	});

	toggleOpen() {
		this.open = !this.open;
	}
}
