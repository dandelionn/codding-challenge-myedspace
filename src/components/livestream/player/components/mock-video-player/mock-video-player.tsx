import { useRef } from 'react';
import { useTranslations } from '@/i18n';
import type { VideoPlayerProps } from '../../types';
import styles from './mock-video-player.module.css';

export default function MockVideoPlayer({ videoId, title, onEvent }: VideoPlayerProps) {
	const currentTimeRef = useRef(0);
	const t = useTranslations('livestream.player');

	const handlePlay = () => {
		onEvent({
			type: 'play',
			at: new Date().toISOString(),
			currentTime: currentTimeRef.current,
		});
	};

	const handlePause = () => {
		onEvent({
			type: 'pause',
			at: new Date().toISOString(),
			currentTime: currentTimeRef.current,
		});
	};

	const handleSeek = () => {
		const from = currentTimeRef.current;
		const to = from + 30;
		currentTimeRef.current = to;

		onEvent({
			type: 'seek',
			at: new Date().toISOString(),
			from,
			to,
		});
	};

	return (
		<div className={styles.wrapper} data-testid="mock-video-player">
			<div className={styles.screen}>
				<p className={styles.label}>{t('mockLabel')}</p>
				<p className={styles.title}>{title}</p>
				<p className={styles.meta}>{t('videoId', { videoId })}</p>
			</div>
			<div className={styles.controls}>
				<button type="button" className={styles.control} onClick={handlePlay}>
					{t('controls.play')}
				</button>
				<button type="button" className={styles.control} onClick={handlePause}>
					{t('controls.pause')}
				</button>
				<button type="button" className={styles.control} onClick={handleSeek}>
					{t('controls.seek')}
				</button>
			</div>
		</div>
	);
}
