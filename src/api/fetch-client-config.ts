import { customFetch } from '@/api/fetcher';
import type { CreateClientConfig } from '@/api/generated/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
	...config,
	baseUrl: 'http://localhost:3001',
	fetch: customFetch,
	credentials: 'include',
});
