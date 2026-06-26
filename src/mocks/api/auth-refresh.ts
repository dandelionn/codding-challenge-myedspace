import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from './constants';
import { isDemoAuthenticated, setDemoAuthenticated } from './demo-session';

export const authRefreshHandlers = [
	http.post(`${API_BASE_URL}/auth/refresh`, ({ request }) => {
		if (!isDemoAuthenticated(request)) {
			return new HttpResponse(null, { status: 401 });
		}

		setDemoAuthenticated(true);

		return new HttpResponse(null, { status: 204 });
	}),
];
