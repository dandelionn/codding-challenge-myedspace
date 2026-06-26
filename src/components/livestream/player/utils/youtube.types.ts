export const YT_PLAYER_STATE = {
	UNSTARTED: -1,
	ENDED: 0,
	PLAYING: 1,
	PAUSED: 2,
	BUFFERING: 3,
	CUED: 5,
} as const;

export type YouTubePlayer = {
	destroy: () => void;
	getCurrentTime: () => number;
	getPlayerState: () => number;
};

export type YouTubePlayerConstructor = new (
	element: HTMLElement,
	options: {
		videoId: string;
		playerVars?: Record<string, string | number>;
		events?: {
			onReady?: (event: { target: YouTubePlayer }) => void;
			onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
			onError?: (event: { data: number }) => void;
		};
	}
) => YouTubePlayer;

export type YouTubeIframeApi = {
	Player: YouTubePlayerConstructor;
	PlayerState: typeof YT_PLAYER_STATE;
};

declare global {
	interface Window {
		YT?: YouTubeIframeApi;
		onYouTubeIframeAPIReady?: () => void;
	}
}
