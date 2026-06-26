import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { MswProvider } from '@/providers/msw-provider';
import MswToggle from '@/components/dev/msw-toggle';
import { theme } from '@/theme';
import LoginPage from '@/views/login';
import DashboardPage from '@/views/dashboard';
import ProtectedRoute from '@/components/protected-route';
import { PrivateRoutes, PublicRoutes } from '@/routes';

function App() {
	return (
		<ReactQueryProvider>
			<MswProvider>
				<MantineProvider theme={theme} defaultColorScheme="auto">
					<MswToggle />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Navigate to={PublicRoutes.login} replace />} />
							<Route path={PublicRoutes.login} element={<LoginPage />} />
							<Route element={<ProtectedRoute />}>
								<Route path={PrivateRoutes.dashboard} element={<DashboardPage />} />
							</Route>
							<Route path="*" element={<Navigate to={PublicRoutes.login} replace />} />
						</Routes>
					</BrowserRouter>
				</MantineProvider>
			</MswProvider>
		</ReactQueryProvider>
	);
}

export default App;
