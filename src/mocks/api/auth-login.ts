import { http, HttpResponse } from 'msw';
import type { LoginRequest } from '@/api/generated';
import { HARDCODED_USER, MOCK_USER, API_BASE_URL } from './constants';
import { createErrorResponse, validateCSRF } from './auth-utils';

const sessionCookies =
	'connect.sid=mock-session; Path=/; SameSite=Strict, access_token=mock-access-token; Path=/; SameSite=Strict';

export const authLoginHandlers = [
	http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const { email, password } = (await request.json()) as LoginRequest;

		if (email === HARDCODED_USER.email && password === HARDCODED_USER.password) {
			return HttpResponse.json(MOCK_USER, {
				headers: {
					'Set-Cookie': sessionCookies,
				},
			});
		}

		return createErrorResponse('Incorrect email or password', 401);
	}),
];
