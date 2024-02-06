import { writable } from 'svelte/store';

export const archiveOptions = writable<ArchiveStore>({
	isMobile: true,
	strokeWidth: 0,
	windowWidth: 0,
	circleWidth: 0,
	circleHeight: 0
});

export const semesterOptions = writable<Record<string, SemesterOptions>>({});

type ArchiveStore = {
	isMobile: boolean;
	strokeWidth: number;
	windowWidth: number;
	circleWidth: number;
	circleHeight: number;
};

export type SemesterOptions = {
	open: boolean;
	titlesHeight: number;
};
