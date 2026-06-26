import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from './constants';

export const csrfToken = 'abc123csrfTOKEN456xyz';

export const csrfHandlers = [
	http.get(`${API_BASE_URL}/csrf/token`, () => {
		return HttpResponse.json(
			{ csrfToken },
			{
				status: 200,
				headers: {
					'Set-Cookie': `XSRF-TOKEN=${csrfToken}; Path=/; SameSite=Strict`,
				},
			}
		);
	}),
];
