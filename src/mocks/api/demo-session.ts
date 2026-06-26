let demoAuthenticated = false;

export function setDemoAuthenticated(value: boolean) {
	demoAuthenticated = value;
}

export function isDemoAuthenticated(request: Request): boolean {
	const cookies = request.headers.get('cookie');
	const hasCookies =
		cookies?.includes('connect.sid') && cookies?.includes('access_token');

	return hasCookies || demoAuthenticated;
}
