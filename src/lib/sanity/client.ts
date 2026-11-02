import { createClient } from "@sanity/client";
import { PUBLIC_SANITY_DATASET } from "$app/env/public";

export const sanityClient = createClient({
	projectId: "4s9wdr84",
	dataset: PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2024-01-16",
	useCdn: false,
});
