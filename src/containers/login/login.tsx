import LoginForm from '@/components/auth/login-form';
import type { Message } from '@/components/message-box';
import { getCsrfToken, type LoginRequest } from '@/api/generated';
import { getAuthSessionQueryKey, postAuthLoginMutation } from '@/api/generated/@tanstack/react-query.gen';
import { useTranslations } from '@/i18n';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PrivateRoutes } from '@/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function LoginContainer() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();
	const t = useTranslations('forms.login');
	const [csrfError, setCsrfError] = useState<Message[] | undefined>();
	const { data, error, status, mutate, isPending } = useMutation({ ...postAuthLoginMutation() });

	useEffect(() => {
		if (status === 'success' && data) {
			queryClient.setQueryData(getAuthSessionQueryKey(), { user: data });

			const redirectUrl = searchParams.get('redirect');
			navigate(redirectUrl ?? PrivateRoutes.dashboard, { replace: true });
		}
	}, [status, data, searchParams, navigate, queryClient]);

	const handleLogin = async (credentials: LoginRequest) => {
		setCsrfError(undefined);

		try {
			const csrfToken = (await getCsrfToken()).data?.csrfToken;
			if (!csrfToken) {
				throw new Error('Missing CSRF token');
			}

			mutate({
				headers: {
					'x-csrf-token': csrfToken,
				},
				body: credentials,
			});
		} catch {
			setCsrfError([{ text: t('errors.csrfFailed'), severity: 'error' }]);
		}
	};

	const messages = [...(csrfError ?? []), ...(error?.messages ?? [])];

	return (
		<LoginForm
			onSubmit={handleLogin}
			loading={isPending}
			messages={messages.length > 0 ? messages : undefined}
		/>
	);
}
