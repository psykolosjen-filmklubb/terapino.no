import { writable } from 'svelte/store';

export const archiveOptions = writable<ArchiveStore>({
	isMobile: true,
	strokeWidth: 0,
	strokeColor: 'black',
	windowWidth: 0,
	circleWidth: 0,
	circleHeight: 0
});

export const semesterOptions = writable<Record<string, SemesterOptions>>({});
export const semesterMarginsTop = writable<Record<string, number>>({});
export const semesterMarginsBottom = writable<Record<string, number>>({});

type ArchiveStore = {
	isMobile: boolean;
	strokeWidth: number;
	strokeColor: 'black' | 'white';
	windowWidth: number;
	circleWidth: number;
	circleHeight: number;
};

export type SemesterOptions = {
	open: boolean;
	titlesHeight: number;
};
