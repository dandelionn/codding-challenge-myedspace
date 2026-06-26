import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleProvider } from '@/i18n';
import VideoPlayer from './video-player';
import * as resolveVideoPlayer from '../../utils/resolve-video-player';

describe('VideoPlayer adapter', () => {
	it('uses MockVideoPlayer in tests so YouTube scripts are never loaded', async () => {
		expect(resolveVideoPlayer.shouldUseMockVideoPlayer()).toBe(true);

		const onEvent = vi.fn();
		const user = userEvent.setup();

		render(
			<LocaleProvider>
				<VideoPlayer videoId="adapter-test" title="Adapter test" onEvent={onEvent} />
			</LocaleProvider>
		);

		expect(screen.getByTestId('mock-video-player')).toBeInTheDocument();
		expect(screen.queryByText(/loading player/i)).not.toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Play' }));

		expect(onEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'play',
				currentTime: expect.any(Number),
			})
		);
	});

	it('can swap to YoutubeIframePlayer when mock mode is disabled', () => {
		const shouldUseMockSpy = vi
			.spyOn(resolveVideoPlayer, 'shouldUseMockVideoPlayer')
			.mockReturnValue(false);

		const onEvent = vi.fn();

		render(
			<LocaleProvider>
				<VideoPlayer videoId="real-player" title="Real player" onEvent={onEvent} />
			</LocaleProvider>
		);

		expect(screen.queryByTestId('mock-video-player')).not.toBeInTheDocument();

		shouldUseMockSpy.mockRestore();
	});
});
