import { writable } from 'svelte/store';

export const archiveStore = writable<ArchiveStore>({
	isMobile: true,
	strokeWidth: 0,
	windowWidth: 0,
	circleWidth: 0,
	circleHeight: 0,
	semesters: {}
});

type ArchiveStore = {
	isMobile: boolean;
	strokeWidth: number;
	windowWidth: number;
	circleWidth: number;
	circleHeight: number;
	semesters: {
		[id in string]: {
			open: boolean;
			titlesHeight?: number;
		};
	};
};
