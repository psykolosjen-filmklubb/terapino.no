import { createClient } from '@sanity/client';

const client = createClient({
	projectId: '1pfu395i',
	dataset: 'production',
	apiVersion: '2024-01-16',
	useCdn: false
});
