import type { Livestream } from '@/api/generated';
import type { VideoInteractionEvent } from '@/components/livestream';
import { VideoEventLog, VideoPlayer } from '@/components/livestream';
import { useTranslations } from '@/i18n';
import styles from './livestream-player-view.module.css';

type LivestreamPlayerViewProps = {
	livestream: Livestream;
	events: VideoInteractionEvent[];
	onEvent: (event: VideoInteractionEvent) => void;
	onClearEvents: () => void;
};

export default function LivestreamPlayerView({
	livestream,
	events,
	onEvent,
	onClearEvents,
}: LivestreamPlayerViewProps) {
	const t = useTranslations('livestream');
	const isLive = livestream.status === 'live';

	return (
		<section className={styles.panel} aria-label={t('ariaLabel')}>
			<div className={styles.header}>
				<h2 className={styles.title}>{livestream.title}</h2>
				<p className={styles.meta}>{t('videoId', { videoId: livestream.videoId })}</p>
				<span className={isLive ? styles.statusLive : styles.statusOffline}>
					{isLive ? t('status.live') : t('status.offline')}
				</span>
			</div>

			<div className={styles.content}>
				<VideoPlayer
					videoId={livestream.videoId}
					title={livestream.title}
					onEvent={onEvent}
				/>
				<VideoEventLog events={events} onClear={onClearEvents} />
			</div>
		</section>
	);
}
