import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from './constants';
import { isDemoAuthenticated } from './demo-session';

export const MOCK_LIVESTREAM = {
	// Reliable public embed; lofi/live IDs often show "recording not available".
	videoId: 'LXb3EKWsInQ',
	status: 'live' as const,
	title: 'Demo Video — Costa Rica 4K',
};

export const livestreamHandlers = [
	http.get(`${API_BASE_URL}/livestream/current`, ({ request }) => {
		if (!isDemoAuthenticated(request)) {
			return new HttpResponse(null, { status: 401 });
		}

		return HttpResponse.json(MOCK_LIVESTREAM);
	}),
];
