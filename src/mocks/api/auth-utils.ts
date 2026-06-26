import { HttpResponse } from 'msw';
import { csrfToken } from './csrf';

export const validateCSRF = (request: Request): HttpResponse<null> | null => {
	if (request.headers.get('x-csrf-token') !== csrfToken) {
		return new HttpResponse(null, { status: 400 });
	}
	return null;
};

export const createErrorResponse = (message: string, status: number) =>
	HttpResponse.json({ messages: [{ text: message, severity: 'error' }] }, { status });
