import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from './constants';
import { validateCSRF } from './auth-utils';
import { setDemoAuthenticated } from './demo-session';

export const authLogoutHandlers = [
	http.post(`${API_BASE_URL}/auth/logout`, ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		setDemoAuthenticated(false);

		return new HttpResponse(null, {
			status: 204,
			headers: {
				'Set-Cookie': 'connect.sid=; Path=/; Max-Age=0, access_token=; Path=/; Max-Age=0',
			},
		});
	}),
];
