import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { render as testingLibraryRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
	getAuthSessionQueryKey,
	getLivestreamCurrentQueryKey,
} from '@/api/generated/@tanstack/react-query.gen';
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

describe('LivestreamPanel interaction tracking', () => {
	it('records play, pause, and seek interactions in the UI event log', async () => {
		const user = userEvent.setup();
		const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

		renderLivestreamPanel();

		expect(screen.getByTestId('mock-video-player')).toBeInTheDocument();
		expect(screen.getByTestId('video-event-log')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Play' }));
		await user.click(screen.getByRole('button', { name: 'Pause' }));
		await user.click(screen.getByRole('button', { name: 'Seek +30s' }));

		await waitFor(() => {
			expect(screen.getByText('play')).toBeInTheDocument();
			expect(screen.getByText('pause')).toBeInTheDocument();
			expect(screen.getByText('seek')).toBeInTheDocument();
		});

		expect(screen.getByText('0:00 → 0:30')).toBeInTheDocument();
		expect(screen.getByLabelText('3 events recorded')).toBeInTheDocument();

		expect(consoleSpy).toHaveBeenCalledWith(
			'[video-event]',
			expect.objectContaining({ type: 'play' })
		);
		expect(consoleSpy).toHaveBeenCalledWith(
			'[video-event]',
			expect.objectContaining({ type: 'pause' })
		);
		expect(consoleSpy).toHaveBeenCalledWith(
			'[video-event]',
			expect.objectContaining({ type: 'seek', from: 0, to: 30 })
		);

		await user.click(screen.getByRole('button', { name: 'Clear' }));

		await waitFor(() => {
			expect(screen.getByText(/play, pause, or seek the video/i)).toBeInTheDocument();
		});

		consoleSpy.mockRestore();
	});
});
