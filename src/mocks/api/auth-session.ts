import { http, HttpResponse } from 'msw';
import { API_BASE_URL, MOCK_USER } from './constants';
import { isDemoAuthenticated } from './demo-session';

export const authSessionHandlers = [
	http.get(`${API_BASE_URL}/auth/session`, ({ request }) => {
		if (!isDemoAuthenticated(request)) {
			return new HttpResponse(null, { status: 401 });
		}

		return HttpResponse.json({ user: MOCK_USER });
	}),
];
