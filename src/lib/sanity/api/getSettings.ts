import groq from "groq";
import { sanityClient } from "../client";

type Instillinger = {
	recruiting: {
		recruiting_active: boolean;
		recruiting_form: string;
	};
};

export async function getSettings() {
	return sanityClient.fetch<Instillinger>(
		groq`*[_type == "settings" && title == "Instillinger"][0] {
			recruiting {
				recruiting_active,
				recruiting_form
			}
		}`,
	);
}
