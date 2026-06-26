import { useQuery } from '@tanstack/react-query';
import { getAuthSessionOptions } from '@/api/generated/@tanstack/react-query.gen';

export function useLivestreamAccess() {
	const { data: session, isLoading, isError, isFetching } = useQuery({
		...getAuthSessionOptions(),
		retry: false,
	});

	const isAuthenticated = Boolean(session?.user);

	return {
		user: session?.user,
		isAuthenticated,
		isLoading,
		isError,
		isFetching,
	};
}
