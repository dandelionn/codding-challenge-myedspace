import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAuthSessionOptions } from '@/api/generated/@tanstack/react-query.gen';
import { PublicRoutes } from '@/routes';
import { Loader, Center } from '@mantine/core';
import { useTranslations } from '@/i18n';

export default function ProtectedRoute() {
	const location = useLocation();
	const t = useTranslations('a11y');
	const { data, isLoading, isError } = useQuery({
		...getAuthSessionOptions(),
		retry: false,
	});

	if (isLoading) {
		return (
			<Center h="100vh" component="main">
				<Loader aria-label={t('checkingSession')} />
			</Center>
		);
	}

	if (isError || !data?.user) {
		const redirect = encodeURIComponent(location.pathname);
		return <Navigate to={`${PublicRoutes.login}?redirect=${redirect}`} replace />;
	}

	return <Outlet context={data.user} />;
}
