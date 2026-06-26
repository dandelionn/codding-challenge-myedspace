import { authLoginHandlers } from './auth-login';
import { authLogoutHandlers } from './auth-logout';
import { authRefreshHandlers } from './auth-refresh';
import { authSessionHandlers } from './auth-session';
import { csrfHandlers } from './csrf';
import { livestreamHandlers } from './livestream';

export const allApiHandlers = [
	...csrfHandlers,
	...authLoginHandlers,
	...authRefreshHandlers,
	...authSessionHandlers,
	...authLogoutHandlers,
	...livestreamHandlers,
];
