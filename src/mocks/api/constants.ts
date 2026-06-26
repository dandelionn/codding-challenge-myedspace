export const API_BASE_URL = 'http://localhost:3001';

export const HARDCODED_USER = {
	email: 'admin@example.com',
	password: 'password123',
};

export const MOCK_USER = {
	id: 1,
	firstName: 'Admin',
	lastName: 'User',
	email: HARDCODED_USER.email,
	role: 'admin',
	createdAt: '2023-01-01T12:00:00Z',
	enabled2FA: false,
	status: 'active',
};
