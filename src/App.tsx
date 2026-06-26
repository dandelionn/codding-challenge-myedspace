import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { LocaleProvider } from '@/i18n';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import { MswProvider } from '@/providers/msw-provider';
import MswToggle from '@/components/dev/msw-toggle';
import WelcomeModal from '@/components/welcome-modal';
import { theme } from '@/theme';
import LoginPage from '@/views/login';
import DashboardPage from '@/views/dashboard';
import WatchPage from '@/views/watch';
import ProtectedRoute from '@/components/protected-route';
import { PrivateRoutes, PublicRoutes } from '@/routes';

function App() {
	return (
		<ReactQueryProvider>
			<LocaleProvider>
				<MswProvider>
					<MantineProvider theme={theme} defaultColorScheme="auto">
						<MswToggle />
						<WelcomeModal />
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Navigate to={PublicRoutes.watch} replace />} />
								<Route path={PublicRoutes.watch} element={<WatchPage />} />
								<Route path={PublicRoutes.login} element={<LoginPage />} />
								<Route element={<ProtectedRoute />}>
									<Route path={PrivateRoutes.dashboard} element={<DashboardPage />} />
								</Route>
								<Route path="*" element={<Navigate to={PublicRoutes.watch} replace />} />
							</Routes>
						</BrowserRouter>
					</MantineProvider>
				</MswProvider>
			</LocaleProvider>
		</ReactQueryProvider>
	);
}

export default App;
