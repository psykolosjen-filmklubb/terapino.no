import { SemesterState, type Semester } from './SemesterState.svelte';

export class ArchiveState {
	semesters: SemesterState[] = $state([]);

	containerWidth: number = $state(0);
	containerHeight: number = $state(0);

	isNarrow: boolean = $derived(this.containerWidth < 1024);

	strokeWidth: number = $derived(this.isNarrow ? 2 : 4);
	circleSize: number = $derived(this.isNarrow ? 32 : 48);

	constructor(semesters: Semester[]) {
		this.semesters = semesters.map((semester, i) => {
			return new SemesterState(semester, i, this);
		});
	}
}
