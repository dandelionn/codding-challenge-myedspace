import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '@/views/login';
import DashboardPage from '@/views/dashboard';
import ProtectedRoute from '@/components/protected-route';
import { theme } from '@/theme';
import { HARDCODED_USER } from '@/mocks/api/constants';
import { PrivateRoutes, PublicRoutes } from '@/routes';

function renderApp(initialEntries = ['/login']) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

	return render(
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<MemoryRouter initialEntries={initialEntries}>
					<Routes>
						<Route path="/" element={<Navigate to={PublicRoutes.login} replace />} />
						<Route path={PublicRoutes.login} element={<LoginPage />} />
						<Route element={<ProtectedRoute />}>
							<Route path={PrivateRoutes.dashboard} element={<DashboardPage />} />
						</Route>
					</Routes>
				</MemoryRouter>
			</MantineProvider>
		</QueryClientProvider>
	);
}

describe('Login flow', () => {
	test('logs in with the hardcoded user via MSW', async () => {
		const user = userEvent.setup();
		renderApp();

		await user.type(screen.getByLabelText(/email/i), HARDCODED_USER.email);
		await user.type(screen.getByLabelText(/password/i), HARDCODED_USER.password);
		await user.click(screen.getByRole('button', { name: /login/i }));

		await waitFor(() => {
			expect(screen.getByText(/welcome, admin user/i)).toBeInTheDocument();
		});
	});

	test('shows an error for invalid credentials', async () => {
		const user = userEvent.setup();
		renderApp();

		await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
		await user.type(screen.getByLabelText(/password/i), 'wrong-password');
		await user.click(screen.getByRole('button', { name: /login/i }));

		expect(await screen.findByText(/incorrect email or password/i)).toBeInTheDocument();
	});
});
