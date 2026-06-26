import type { YouTubeIframeApi } from './youtube.types';

const YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api';

let loadPromise: Promise<YouTubeIframeApi> | null = null;

export function loadYoutubeIframeApi(): Promise<YouTubeIframeApi> {
	if (window.YT?.Player) {
		return Promise.resolve(window.YT);
	}

	if (loadPromise) {
		return loadPromise;
	}

	loadPromise = new Promise((resolve, reject) => {
		const previousReady = window.onYouTubeIframeAPIReady;

		window.onYouTubeIframeAPIReady = () => {
			previousReady?.();

			if (window.YT?.Player) {
				resolve(window.YT);
				return;
			}

			reject(new Error('YouTube IFrame API failed to initialize'));
		};

		if (!document.querySelector(`script[src="${YOUTUBE_IFRAME_API_SRC}"]`)) {
			const script = document.createElement('script');
			script.src = YOUTUBE_IFRAME_API_SRC;
			script.async = true;
			script.onerror = () => {
				loadPromise = null;
				reject(new Error('Failed to load YouTube IFrame API'));
			};
			document.head.appendChild(script);
		}
	});

	return loadPromise;
}
