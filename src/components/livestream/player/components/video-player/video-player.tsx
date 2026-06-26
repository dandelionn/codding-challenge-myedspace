import type { VideoPlayerProps } from '../../types';
import { shouldUseMockVideoPlayer } from '../../utils/resolve-video-player';
import MockVideoPlayer from '../mock-video-player';
import YoutubeIframePlayer from '../youtube-iframe-player';

export default function VideoPlayer(props: VideoPlayerProps) {
	if (shouldUseMockVideoPlayer()) {
		return <MockVideoPlayer {...props} />;
	}

	return <YoutubeIframePlayer {...props} />;
}
