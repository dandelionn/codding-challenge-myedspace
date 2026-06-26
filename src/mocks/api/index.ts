import { authLoginHandlers } from './auth-login';
import { authLogoutHandlers } from './auth-logout';
import { authSessionHandlers } from './auth-session';
import { csrfHandlers } from './csrf';

export const allApiHandlers = [
	...csrfHandlers,
	...authLoginHandlers,
	...authSessionHandlers,
	...authLogoutHandlers,
];
