import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from './constants';
import { MOCK_USER } from './constants';

export const authSessionHandlers = [
	http.get(`${API_BASE_URL}/auth/session`, ({ request }) => {
		const cookies = request.headers.get('cookie');

		if (!cookies?.includes('connect.sid') || !cookies?.includes('access_token')) {
			return new HttpResponse(null, { status: 401 });
		}

		return HttpResponse.json(MOCK_USER);
	}),
];
