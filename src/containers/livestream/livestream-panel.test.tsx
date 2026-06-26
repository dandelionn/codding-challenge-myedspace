import { describe, expect, it } from 'vitest';
import { screen } from '@/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { render as testingLibraryRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getAuthSessionQueryKey, getLivestreamCurrentQueryKey } from '@/api/generated/@tanstack/react-query.gen';
import { LocaleProvider } from '@/i18n';
import LivestreamPanel from '@/containers/livestream';
import { MOCK_USER } from '@/mocks/api/constants';
import { MOCK_LIVESTREAM } from '@/mocks/api/livestream';
import { theme } from '@/theme';

function renderLivestreamPanel({
	authenticated = true,
	initialEntries = ['/watch'],
}: {
	authenticated?: boolean;
	initialEntries?: string[];
} = {}) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false, staleTime: Infinity },
			mutations: { retry: false },
		},
	});

	if (authenticated) {
		queryClient.setQueryData(getAuthSessionQueryKey(), { user: MOCK_USER });
		queryClient.setQueryData(getLivestreamCurrentQueryKey(), MOCK_LIVESTREAM);
	} else {
		queryClient.setQueryData(getAuthSessionQueryKey(), {});
	}

	return testingLibraryRender(
		<LocaleProvider>
			<QueryClientProvider client={queryClient}>
				<MantineProvider theme={theme}>
					<MemoryRouter initialEntries={initialEntries}>
						<LivestreamPanel />
					</MemoryRouter>
				</MantineProvider>
			</QueryClientProvider>
		</LocaleProvider>
	);
}

describe('LivestreamPanel access control', () => {
	it('does not render the video player or stream metadata for unauthenticated users', () => {
		renderLivestreamPanel({ authenticated: false });

		expect(screen.getByTestId('video-login-prompt')).toBeInTheDocument();
		expect(screen.getByText(/sign in to watch the livestream/i)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /log in/i })).toHaveAttribute(
			'href',
			'/login?redirect=%2Fwatch'
		);

		expect(screen.queryByTestId('mock-video-player')).not.toBeInTheDocument();
		expect(screen.queryByTestId('video-event-log')).not.toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { name: MOCK_LIVESTREAM.title })
		).not.toBeInTheDocument();
		expect(screen.queryByText(new RegExp(MOCK_LIVESTREAM.videoId))).not.toBeInTheDocument();
	});
});
