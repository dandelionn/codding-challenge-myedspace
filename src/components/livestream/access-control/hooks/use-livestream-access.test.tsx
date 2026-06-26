import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { getAuthSessionQueryKey } from '@/api/generated/@tanstack/react-query.gen';
import { LocaleProvider } from '@/i18n';
import { MOCK_USER } from '@/mocks/api/constants';
import { useLivestreamAccess } from './use-livestream-access';

function createWrapper(queryClient: QueryClient) {
	return function Wrapper({ children }: { children: ReactNode }) {
		return (
			<LocaleProvider>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</LocaleProvider>
		);
	};
}

describe('useLivestreamAccess', () => {
	it('returns authenticated when session has a user', async () => {
		const queryClient = new QueryClient({
			defaultOptions: { queries: { retry: false, staleTime: Infinity } },
		});
		queryClient.setQueryData(getAuthSessionQueryKey(), { user: MOCK_USER });

		const { result } = renderHook(() => useLivestreamAccess(), {
			wrapper: createWrapper(queryClient),
		});

		await waitFor(() => {
			expect(result.current.isAuthenticated).toBe(true);
		});

		expect(result.current.user).toEqual(MOCK_USER);
	});

	it('returns unauthenticated when session has no user', async () => {
		const queryClient = new QueryClient({
			defaultOptions: { queries: { retry: false, staleTime: Infinity } },
		});
		queryClient.setQueryData(getAuthSessionQueryKey(), {});

		const { result } = renderHook(() => useLivestreamAccess(), {
			wrapper: createWrapper(queryClient),
		});

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.user).toBeUndefined();
	});
});
