import { getCsrfToken } from './generated';

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const LOGIN_URL = '/login';
const BASE_SERVER_URL = 'http://localhost:3001';

function releasePendingRequests() {
	pendingRequests.forEach((callback) => callback());
	pendingRequests = [];
}

async function refreshToken(): Promise<void> {
	if (isRefreshing) {
		return new Promise((resolve) => {
			pendingRequests.push(resolve);
		});
	}

	isRefreshing = true;

	try {
		const csrfToken = (await getCsrfToken()).data?.csrfToken;
		const headers: HeadersInit = csrfToken ? { 'x-csrf-token': csrfToken } : {};

		const response = await fetch(`${BASE_SERVER_URL}/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
			headers,
		});

		if (!response.ok) {
			throw new Error('Refresh failed');
		}
	} finally {
		isRefreshing = false;
		releasePendingRequests();
	}
}

function createFetchRequest(input: RequestInfo | URL, init?: RequestInit): Request {
	if (input instanceof Request) {
		return input.clone();
	}

	return new Request(input, {
		...init,
		credentials: 'include',
	});
}

export const customFetch: typeof fetch = async (input, init) => {
	const request = createFetchRequest(input, init);
	const retryRequest = request.clone();

	let response = await fetch(request);

	if (response.status === 401) {
		try {
			await refreshToken();
			response = await fetch(retryRequest);
		} catch (err) {
			if (!import.meta.env.VITEST) {
				window.location.replace(LOGIN_URL);
			}

			console.error('Token refresh failed:', err);
		}
	}

	return response;
};
