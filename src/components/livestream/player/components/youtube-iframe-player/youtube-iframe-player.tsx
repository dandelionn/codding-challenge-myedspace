import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/i18n';
import { loadYoutubeIframeApi } from '../../utils/load-youtube-iframe-api';
import type { VideoPlayerProps } from '../../types';
import { YT_PLAYER_STATE, type YouTubePlayer } from '../../utils/youtube.types';
import styles from './youtube-iframe-player.module.css';

const SEEK_THRESHOLD_SECONDS = 1.5;
const SEEK_POLL_INTERVAL_MS = 500;

export default function YoutubeIframePlayer({ videoId, title, onEvent }: VideoPlayerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<YouTubePlayer | null>(null);
	const lastTimeRef = useRef(0);
	const wasPlayingRef = useRef(false);
	const onEventRef = useRef(onEvent);
	const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
	const t = useTranslations('livestream.player');

	onEventRef.current = onEvent;

	useEffect(() => {
		let cancelled = false;
		let pollId: number | undefined;
		const container = containerRef.current;

		if (!container) {
			return;
		}

		const recordSeekIfNeeded = (player: YouTubePlayer) => {
			const currentTime = player.getCurrentTime();
			const previousTime = lastTimeRef.current;

			if (
				previousTime > 0 &&
				Math.abs(currentTime - previousTime) > SEEK_THRESHOLD_SECONDS
			) {
				onEventRef.current({
					type: 'seek',
					at: new Date().toISOString(),
					from: previousTime,
					to: currentTime,
				});
			}

			lastTimeRef.current = currentTime;
		};

		const startSeekPolling = () => {
			if (pollId) {
				window.clearInterval(pollId);
			}

			pollId = window.setInterval(() => {
				if (!playerRef.current) {
					return;
				}

				const state = playerRef.current.getPlayerState();
				if (
					state === YT_PLAYER_STATE.PLAYING ||
					state === YT_PLAYER_STATE.PAUSED ||
					state === YT_PLAYER_STATE.BUFFERING
				) {
					recordSeekIfNeeded(playerRef.current);
				}
			}, SEEK_POLL_INTERVAL_MS);
		};

		loadYoutubeIframeApi()
			.then((YT) => {
				if (cancelled || !containerRef.current) {
					return;
				}

				playerRef.current = new YT.Player(containerRef.current, {
					videoId,
					playerVars: {
						rel: 0,
						modestbranding: 1,
						playsinline: 1,
					},
					events: {
						onReady: ({ target }) => {
							if (cancelled) {
								return;
							}

							playerRef.current = target;
							lastTimeRef.current = target.getCurrentTime();
							setStatus('ready');
							startSeekPolling();
						},
						onStateChange: ({ data, target }) => {
							if (cancelled) {
								return;
							}

							const currentTime = target.getCurrentTime();

							if (data === YT_PLAYER_STATE.PLAYING && !wasPlayingRef.current) {
								wasPlayingRef.current = true;
								onEventRef.current({
									type: 'play',
									at: new Date().toISOString(),
									currentTime,
								});
							}

							if (data === YT_PLAYER_STATE.PAUSED && wasPlayingRef.current) {
								wasPlayingRef.current = false;
								onEventRef.current({
									type: 'pause',
									at: new Date().toISOString(),
									currentTime,
								});
							}

							if (data === YT_PLAYER_STATE.BUFFERING) {
								recordSeekIfNeeded(target);
							}

							lastTimeRef.current = currentTime;
						},
						onError: () => {
							if (!cancelled) {
								setStatus('error');
							}
						},
					},
				});
			})
			.catch(() => {
				if (!cancelled) {
					setStatus('error');
				}
			});

		return () => {
			cancelled = true;

			if (pollId) {
				window.clearInterval(pollId);
			}

			playerRef.current?.destroy();
			playerRef.current = null;
			wasPlayingRef.current = false;
			lastTimeRef.current = 0;
			container.replaceChildren();
		};
	}, [videoId]);

	return (
		<div className={styles.wrapper}>
			<div
				ref={containerRef}
				className={styles.player}
				title={title}
				aria-label={title}
			/>
			{status === 'loading' && (
				<p className={styles.status} role="status">
					{t('loading')}
				</p>
			)}
			{status === 'error' && (
				<p className={styles.status} role="alert">
					{t('error')}
				</p>
			)}
		</div>
	);
}
