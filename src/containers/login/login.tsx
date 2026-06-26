import LoginForm from '@/components/auth/login-form';
import { getCsrfToken, type LoginRequest } from '@/api/generated';
import { getAuthSessionQueryKey, postAuthLoginMutation } from '@/api/generated/@tanstack/react-query.gen';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PrivateRoutes } from '@/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function LoginContainer() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();
	const { data, error, status, mutate, isPending } = useMutation({ ...postAuthLoginMutation() });

	useEffect(() => {
		if (status === 'success' && data) {
			queryClient.setQueryData(getAuthSessionQueryKey(), { user: data });

			const redirectUrl = searchParams.get('redirect');
			navigate(redirectUrl ?? PrivateRoutes.dashboard, { replace: true });
		}
	}, [status, data, searchParams, navigate, queryClient]);

	const handleLogin = async (credentials: LoginRequest) => {
		mutate({
			headers: {
				'x-csrf-token': (await getCsrfToken()).data?.csrfToken as string,
			},
			body: credentials,
		});
	};

	return <LoginForm onSubmit={handleLogin} loading={isPending} messages={error?.messages} />;
}
