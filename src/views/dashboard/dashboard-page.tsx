import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getCsrfToken, type User } from '@/api/generated';
import { getAuthSessionQueryKey, postAuthLogoutMutation } from '@/api/generated/@tanstack/react-query.gen';
import LivestreamPanel from '@/containers/livestream';
import { useTranslations } from '@/i18n';
import { PublicRoutes } from '@/routes';

export default function DashboardPage() {
	const user = useOutletContext<User>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const t = useTranslations('pages.dashboard');
	const tNav = useTranslations('navigation');

	const { mutate: logout, isPending } = useMutation({
		...postAuthLogoutMutation(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: getAuthSessionQueryKey() });
			navigate(PublicRoutes.watch, { replace: true });
		},
	});

	const handleLogout = async () => {
		logout({
			headers: {
				'x-csrf-token': (await getCsrfToken()).data?.csrfToken as string,
			},
		});
	};

	return (
		<Container py="xl">
			<Stack gap="xl">
				<div>
					<Title order={1}>{t('title')}</Title>
					<Text mt="xs">
						{t('welcome', {
							firstName: user.firstName ?? '',
							lastName: user.lastName ?? '',
							email: user.email ?? '',
						})}
					</Text>
				</div>

				<LivestreamPanel />

				<Button loading={isPending} onClick={handleLogout} w="fit-content">
					{isPending ? tNav('loggingOut') : tNav('logout')}
				</Button>
			</Stack>
		</Container>
	);
}
