export const PrivateRoutes = {
	dashboard: '/dashboard',
	account: '/account',
};

export const PublicRoutes = {
	login: '/login',
	watch: '/watch',
	register: '/register',
	requestPasswordReset: '/request-password-reset',
	requestActivationEmail: '/request-confirmation-email',
	resetPassword: '/reset-password/:token',
	verifyAccount: '/verify-account/:token',
	twoStep: '/two-step',
};
