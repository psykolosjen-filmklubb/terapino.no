import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
	TMDB_BEARER: { static: true },
	PUBLIC_SANITY_DATASET: { public: true, schema: (input) => input ?? "" },
});
