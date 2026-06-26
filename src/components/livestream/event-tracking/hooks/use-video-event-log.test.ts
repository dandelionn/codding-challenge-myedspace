import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVideoEventLog } from './use-video-event-log';

describe('useVideoEventLog', () => {
	it('stores interaction events in memory in playback order', () => {
		const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const { result } = renderHook(() => useVideoEventLog());

		const playEvent = {
			type: 'play' as const,
			at: '2026-01-01T12:00:00.000Z',
			currentTime: 12,
		};
		const pauseEvent = {
			type: 'pause' as const,
			at: '2026-01-01T12:00:30.000Z',
			currentTime: 42,
		};
		const seekEvent = {
			type: 'seek' as const,
			at: '2026-01-01T12:01:00.000Z',
			from: 42,
			to: 90,
		};

		act(() => {
			result.current.recordEvent(playEvent);
			result.current.recordEvent(pauseEvent);
			result.current.recordEvent(seekEvent);
		});

		expect(result.current.events).toEqual([playEvent, pauseEvent, seekEvent]);
		expect(consoleSpy).toHaveBeenCalledTimes(3);

		act(() => {
			result.current.clearEvents();
		});

		expect(result.current.events).toEqual([]);
		consoleSpy.mockRestore();
	});
});
