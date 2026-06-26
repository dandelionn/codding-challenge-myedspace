import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleProvider } from '@/i18n';
import MockVideoPlayer from './mock-video-player';

function renderMockPlayer(onEvent = vi.fn()) {
	render(
		<LocaleProvider>
			<MockVideoPlayer videoId="test-video-id" title="Test stream" onEvent={onEvent} />
		</LocaleProvider>
	);

	return onEvent;
}

describe('MockVideoPlayer (YouTube API abstraction)', () => {
	it('emits normalized play, pause, and seek events without loading the YouTube IFrame API', async () => {
		const user = userEvent.setup();
		const onEvent = renderMockPlayer();

		await user.click(screen.getByRole('button', { name: 'Play' }));
		await user.click(screen.getByRole('button', { name: 'Pause' }));
		await user.click(screen.getByRole('button', { name: 'Seek +30s' }));

		expect(onEvent).toHaveBeenCalledTimes(3);

		expect(onEvent.mock.calls[0][0]).toMatchObject({
			type: 'play',
			currentTime: 0,
		});
		expect(onEvent.mock.calls[1][0]).toMatchObject({
			type: 'pause',
			currentTime: 0,
		});
		expect(onEvent.mock.calls[2][0]).toMatchObject({
			type: 'seek',
			from: 0,
			to: 30,
		});

		for (const call of onEvent.mock.calls) {
			expect(call[0]).toHaveProperty('at');
			expect(typeof call[0].at).toBe('string');
		}
	});
});
