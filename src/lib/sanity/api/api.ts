import groq from 'groq';
import type { Instillinger } from '../types';
import { sanityClient } from '../client';

export async function getSettings() {
	return sanityClient.fetch<Instillinger>(
		groq`*[_type == "settings" && title == "Instillinger"][0] {
			recruiting
		}`
	);
}
