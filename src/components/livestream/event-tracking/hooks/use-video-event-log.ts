import { useCallback, useState } from 'react';
import type { VideoInteractionEvent } from '../types';

export function useVideoEventLog() {
	const [events, setEvents] = useState<VideoInteractionEvent[]>([]);

	const recordEvent = useCallback((event: VideoInteractionEvent) => {
		setEvents((previous) => [...previous, event]);
		console.log('[video-event]', event);
	}, []);

	const clearEvents = useCallback(() => {
		setEvents([]);
	}, []);

	return { events, recordEvent, clearEvents };
}
