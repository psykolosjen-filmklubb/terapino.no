import { createClient } from "@sanity/client";
import { env } from "$env/dynamic/public";

export const sanityClient = createClient({
	projectId: "4s9wdr84",
	dataset: env.PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2024-01-16",
	useCdn: false,
});
