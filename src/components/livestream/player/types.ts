import type { VideoInteractionEvent } from '../event-tracking/types';

export type VideoPlayerProps = {
	videoId: string;
	title: string;
	onEvent: (event: VideoInteractionEvent) => void;
};
