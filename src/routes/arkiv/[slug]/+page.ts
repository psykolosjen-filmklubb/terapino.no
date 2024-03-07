import { getScreening } from '$lib/sanity';

export async function load({ params }) {
	const screening = await getScreening(params.slug);

	return {
		screening
	};
}
