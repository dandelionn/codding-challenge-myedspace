import { Button, Container, Title, Text, Stack } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getCsrfToken, type User } from '@/api/generated';
import { getAuthSessionQueryKey, postAuthLogoutMutation } from '@/api/generated/@tanstack/react-query.gen';
import { PublicRoutes } from '@/routes';

export default function DashboardPage() {
	const user = useOutletContext<User>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isPending } = useMutation({
		...postAuthLogoutMutation(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: getAuthSessionQueryKey() });
			navigate(PublicRoutes.login, { replace: true });
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
			<Stack gap="md">
				<Title order={1}>Dashboard</Title>
				<Text>
					Welcome, {user.firstName} {user.lastName} ({user.email})
				</Text>
				<Button loading={isPending} onClick={handleLogout}>
					Log out
				</Button>
			</Stack>
		</Container>
	);
}
